provider "aws" {
}


terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "sproutly-team"

    workspaces {
      name = "sproutly-api"
    }
  }
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
}

data "aws_secretsmanager_secret" "db" {
  arn = "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/database-qTh79J"
}

data "aws_secretsmanager_secret_version" "db" {
  secret_id = data.aws_secretsmanager_secret.db.id
}


resource "aws_cloudwatch_log_group" "sproutlyapi" {
  name = "awslogs-sproutlyapi-staging"

  tags = {
    Environment = "staging"
    Application = "sproutlyapi"
  }
}

# ALB Security Group: Edit to restrict access to the application
resource "aws_security_group" "lb" {
  name        = "sproutly-staging-lb-sg"
  description = "controls access to the ALB"

  ingress {
    protocol    = "tcp"
    from_port   = var.http_port
    to_port     = var.http_port
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Traffic to the ECS cluster should only come from the ALB
resource "aws_security_group" "ecs_tasks" {
  name        = "sproutly-staging-ecs-tasks-sg"
  description = "allow inbound access from the ALB only"

  ingress {
    protocol        = "tcp"
    from_port       = var.app_port
    to_port         = var.app_port
    cidr_blocks     = ["0.0.0.0/0"]
    security_groups = [aws_security_group.lb.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "rds-sg" {
  name        = "sproutly-staging-rds-sg"
  description = "controls access to the RDS DB"

  ingress {
    protocol    = "tcp"
    from_port   = var.rds-port
    to_port     = var.rds-port
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_security_group" "elsaticache-sg" {
  name        = "sproutly-staging-elsaticache-sg"
  description = "controls access to Elasticache"

  ingress {
    protocol    = "tcp"
    from_port   = var.redis_port
    to_port     = var.redis_port
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_lb" "staging" {
  name               = "sproutly-staging-alb"
  subnets            = data.aws_subnet_ids.default.ids
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]

  tags = {
    Environment = "staging"
    Application = "sproutlyapi"
  }
}

resource "aws_lb_listener" "https_forward" {
  load_balancer_arn = aws_lb.staging.arn
  port              = var.http_port
  protocol          = "HTTP"
  # ssl_policy        = "ELBSecurityPolicy-2016-08"
  # certificate_arn   = "arn:aws:acm:us-west-2:847883372847:certificate/e2600002-ecb4-4298-82e1-9f9d3a2f9ba1"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.staging.arn
  }
}


resource "aws_lb_target_group" "staging" {
  name        = "sproutly-staging-alb-tg"
  port        = var.http_port
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "90"
    protocol            = "HTTP"
    matcher             = "200-299"
    timeout             = "20"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }
}


# ECS task execution role
resource "aws_iam_role" "ecs_task_execution_role" {
  name = var.ecs_task_execution_role_name

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
    EOF
}



resource "aws_iam_role_policy" "ecs_task_execution_policy" {
  name = "ecs_sproutly_task_execution_policy"
  role = aws_iam_role.ecs_task_execution_role.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}


resource "aws_ecs_cluster" "staging" {
  name = var.cluster_name
}

data "template_file" "sproutlyapp" {
  template = file("./sproutlyapp.json.tpl")

  depends_on = [aws_db_instance.postgresql, aws_elasticache_cluster.redis]
  vars = {
    aws_ecr_repository = aws_ecr_repository.repo.repository_url
    tag                = var.tag
    app_port           = var.app_port
    db_port            = aws_db_instance.postgresql.port
    db_host            = aws_db_instance.postgresql.address
    redis_port         = aws_elasticache_cluster.redis.cache_nodes.0.port
    redis_host         = aws_elasticache_cluster.redis.cache_nodes.0.address
  }
}


resource "aws_ecs_task_definition" "service" {
  family                   = "sproutlyapi-staging"
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  cpu                      = 256
  memory                   = 2048
  requires_compatibilities = ["FARGATE"]
  container_definitions    = data.template_file.sproutlyapp.rendered
  tags = {
    Environment = "staging"
    Application = "sproutlyapi"
  }
}


resource "aws_ecs_service" "staging" {
  name                               = "staging"
  cluster                            = aws_ecs_cluster.staging.id
  task_definition                    = aws_ecs_task_definition.service.arn
  desired_count                      = 1
  launch_type                        = "FARGATE"


  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = data.aws_subnet_ids.default.ids
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.staging.arn
    container_name   = "sproutlyapi"
    container_port   = var.app_port
  }

  depends_on = [aws_lb_listener.https_forward, aws_iam_role_policy.ecs_task_execution_policy]

  tags = {
    Environment = "staging"
    Application = "sproutlyapi"
  }
}



resource "aws_ecr_repository" "repo" {
  name = var.image_name
}

resource "aws_ecr_lifecycle_policy" "repo-policy" {
  repository = aws_ecr_repository.repo.name

  policy = <<EOF
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Keep image deployed with tag ${var.tag}",
      "selection": {
        "tagStatus": "tagged",
        "tagPrefixList": ["${var.tag}"],
        "countType": "imageCountMoreThan",
        "countNumber": 1
      },
      "action": {
        "type": "expire"
      }
    },
    {
      "rulePriority": 2,
      "description": "Keep last 2 any images",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 2
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF
}


resource "aws_db_instance" "postgresql" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "11.6"
  instance_class         = "db.t2.micro"
  name                   = "sproutly"
  username               = jsondecode(data.aws_secretsmanager_secret_version.db.secret_string)["username"]
  password               = jsondecode(data.aws_secretsmanager_secret_version.db.secret_string)["password"]
  vpc_security_group_ids = [aws_security_group.rds-sg.id]
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = var.redis_cluster_id
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis3.2"
  engine_version       = "3.2.10"
  port                 = var.redis_port
  security_group_ids   = [aws_security_group.elsaticache-sg.id]
}


# data "external" "hash" {
#   program = ["${coalesce(var.hash_script, "${path.module}/hash.sh")}", "${var.source_path}"]
# }

# # Build and push the Docker image whenever the hash changes
# resource "null_resource" "push" {
#   triggers = {
#     hash = lookup(data.external.hash.result, "hash")
#   }

#   provisioner "local-exec" {
#     command     = "${coalesce(var.push_script, "${path.module}/push.sh")} ${var.source_path} ${aws_ecr_repository.repo.repository_url} ${var.tag}"
#     interpreter = ["bash", "-c"]
#   }
# }




