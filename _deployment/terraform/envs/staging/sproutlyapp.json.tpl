[
  {
    "name": "sproutlyapi",
    "image": "${aws_ecr_repository}:${tag}",
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "eu-west-2",
        "awslogs-stream-prefix": "sproutlyapi-staging-service",
        "awslogs-group": "awslogs-sproutlyapi-staging"
      }
    },
    "portMappings": [
      {
        "containerPort": ${app_port},
        "hostPort": ${app_port},
        "protocol": "tcp"
      }
    ],
    "cpu": 1,
    "environment": [
      {
        "name": "NODE_ENV",
        "value": "staging"
      },
      {
        "name": "PORT",
        "value": "4000"
      },
       {
        "name": "DB_HOST",
        "valueFrom": "${db_host}"
      },
       {
        "name": "DB_PORT",
        "valueFrom": "${db_port}"
      },
      {
        "name": "DB_PASSWORD",
        "valueFrom": "${db_password}"
      },
      {
        "name": "DB_USER",
        "valueFrom": "${db_user}"
      },
       {
        "name": "LOGGLY_TOKEN",
        "valueFrom": "${loggly_token}"
      },
       {
        "name": "LOGGLY_SUBDOMAIN",
        "valueFrom": "${loggly_subdomain}"
      },
       {
        "name": "SENDGRID_API_KEY",
        "valueFrom": "${sendgrid_api_key}"
      },
       {
        "name": "MAIL_SENDER",
        "valueFrom": "${mail_sender}"
      },
       {
        "name": "REDIS_PORT",
        "valueFrom": "${redis_port}"
      },
       {
        "name": "REDIS_HOST",
        "valueFrom": "${redis_host}"
      },
      {
        "name": "REDIS_PASSWORD",
        "valueFrom": "${redis_password}"
      },
       {
        "name": "JWT_SECRET",
        "value": "${jwt_secret}"
      }
    ],
    "ulimits": [
      {
        "name": "nofile",
        "softLimit": 65536,
        "hardLimit": 65536
      }
    ],
    "mountPoints": [],
    "memory": 2048,
    "volumesFrom": []
  }
]
