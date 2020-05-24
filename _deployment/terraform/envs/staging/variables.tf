variable "access_key" {

}
variable "secret_key" {

}
variable "region" {

}

variable "image_name" {
  description = "Name of Docker image"
  default     = "sproutlyapi/staging/runner"
}

variable "cluster_name" {
  description = "Name of ECS Cluster"
  default     = "sproutly-api"
}


variable "app_port" {
  description = "App Port"
  default     = 4000
}

variable "http_port" {
  description = "HTTP Port"
  default     = 80
}

variable "health_check_path" {
  description = "Health Check"
  default     = "/api/health"
}


variable "ecs_task_execution_role_name" {
  description = "ECS task execution role name"
  default     = "ecs-sproutly-staging-execution-role"
}


variable "source_path" {
  description = "Path to Docker image source"
  default     = "../../../../"
}

variable "tag" {
  description = "Tag to use for deployed Docker image"
  default     = "latest"
}

variable "rds-port" {
  description = "Postgres port"
  default     = 5432
}

variable "rds-username" {
  description = "Postgres Username"
}

variable "rds-password" {
  description = "Postgres Password"
}


variable "hash_script" {
  description = "Path to script to generate hash of source contents"
  default     = ""
}

variable "push_script" {
  description = "Path to script to build and push Docker image"
  default     = ""
}
variable "sproutlyapi_tag" {
  default = "latest"
}

variable "ami" {
  default = "ami-0eb89db7593b5d434"
}

variable "environment_tag" {
  description = "Environment tag"
  default     = "staging"
}

variable "instance_type" {
  default = "t2.micro"
}

