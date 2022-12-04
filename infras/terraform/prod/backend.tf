terraform {
  backend "s3" {
    bucket  = "prod-athena-nft-metadata-terraforms-backend"
    key     = "terraform.tfstate"
    region  = "ap-southeast-1"
    profile = "athena-prod"
  }
}
