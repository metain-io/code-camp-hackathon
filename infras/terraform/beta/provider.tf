/* terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
} */

provider "aws" {
  region  = "eu-west-1"
  profile = "hackathon-beta"
  alias   = "ireland"
}

provider "aws" {
  region  = "us-east-1"
  profile = "hackathon-beta"
  alias   = "virginia"
}

provider "aws" {
  region  = "ap-southeast-1"
  profile = "hackathon-beta"
  alias   = "singapore"
}
