output "repository_url" {
  description = "ECR repository URL of Docker image"
  value       = "${aws_ecr_repository.repo.repository_url}"
}

output "tag" {
  description = "Docker image tag"
  value       = "${var.tag}"
}
