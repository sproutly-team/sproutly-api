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
        "name": "REDIS_PORT",
        "value": "${redis_port}"
      },
       {
        "name": "REDIS_HOST",
        "value": "${redis_host}"
      }
    ],
    "secrets":[
      {
        "name": "DB_PASSWORD",
        "valueFrom": "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/database-qTh79J:password::"
      },
      {
        "name": "DB_USER",
        "valueFrom": "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/database-qTh79J:username::"
      },
       {
        "name": "LOGGLY_TOKEN",
        "valueFrom": "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/loggly-FVxZgA:token::"
      },
       {
        "name": "LOGGLY_SUBDOMAIN",
        "valueFrom": "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/loggly-FVxZgA:subdomain::"
      },
       {
        "name": "SENDGRID_API_KEY",
        "valueFrom": "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/mail-wHFwRX:token::"
      },
       {
        "name": "MAIL_SENDER",
        "valueFrom": "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/mail-wHFwRX:sender::"
      },
      {
        "name": "REDIS_PASSWORD",
        "valueFrom": "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/redis-VCvkQl:password::"
      },
       {
        "name": "JWT_SECRET",
        "valueFrom": "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/jwt-TunaRf:secret::"
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
