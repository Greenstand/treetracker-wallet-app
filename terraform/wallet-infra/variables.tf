# variables.tf
variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Name of the S3 bucket for static website"
  type        = string
  default     = "wallet-dev-treetracker"
}

variable "domain_name" {
  description = "Domain name for the website"
  type        = string
  default     = ""  # Empty by default to use CloudFront URL only
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "test", "prod"], var.environment)
    error_message = "Environment must be one of: dev, test, prod."
  }
}