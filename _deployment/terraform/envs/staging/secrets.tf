
data "aws_secretsmanager_secret" "db" {
  arn = "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/database-qTh79J"
}

data "aws_secretsmanager_secret" "log" {
  arn = "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/loggly-FVxZgA"
}

data "aws_secretsmanager_secret" "mail" {
  arn = "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/mail-wHFwRX"
}

data "aws_secretsmanager_secret" "redis" {
  arn = "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/redis-VCvkQl"
}

data "aws_secretsmanager_secret" "jwt" {
  arn = "arn:aws:secretsmanager:eu-west-2:069127369227:secret:sproutly/staging/jwt-TunaRf"
}



data "aws_secretsmanager_secret_version" "db" {
  secret_id = "${data.aws_secretsmanager_secret.db.id}"
}

data "aws_secretsmanager_secret_version" "log" {
  secret_id = "${data.aws_secretsmanager_secret.log.id}"
}

data "aws_secretsmanager_secret_version" "mail" {
  secret_id = "${data.aws_secretsmanager_secret.mail.id}"
}

data "aws_secretsmanager_secret_version" "redis" {
  secret_id = "${data.aws_secretsmanager_secret.redis.id}"
}

data "aws_secretsmanager_secret_version" "jwt" {
  secret_id = "${data.aws_secretsmanager_secret.jwt.id}"
}
