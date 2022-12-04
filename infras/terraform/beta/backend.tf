terraform {
  backend "s3" {
    bucket  = "beta-code-camp-fe-terraforms-backend"
    key     = "terraform.tfstate"
    region  = "ap-southeast-1"
    profile = "hackathon-beta"
  }
}
