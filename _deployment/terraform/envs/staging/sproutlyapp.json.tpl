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
        "value": "${db_host}"
      },
       {
        "name": "DB_PORT",
        "value": "${db_port}"
      },
      {
        "name": "DB_PASSWORD",
        "value": "${db_password}"
      },
      {
        "name": "DB_USER",
        "value": "${db_user}"
      },
       {
        "name": "LOGGLY_TOKEN",
        "value": "${loggly_token}"
      },
       {
        "name": "LOGGLY_SUBDOMAIN",
        "value": "${loggly_subdomain}"
      },
       {
        "name": "SENDGRID_API_KEY",
        "value": "${sendgrid_api_key}"
      },
       {
        "name": "MAIL_SENDER",
        "value": "${mail_sender}"
      },
       {
        "name": "REDIS_PORT",
        "value": "${redis_port}"
      },
       {
        "name": "REDIS_HOST",
        "value": "${redis_host}"
      },
      {
        "name": "REDIS_PASSWORD",
        "value": "${redis_password}"
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
