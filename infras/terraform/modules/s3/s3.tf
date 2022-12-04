variable "projectTags" {}
variable "env" {}
variable "project" {}
variable "name" {}
variable "isAccessViaCF" {}
variable "isWebApp" {}

resource "aws_cloudfront_origin_access_identity" "oai" {
  count   = var.isAccessViaCF ? 1 : 0
  comment = "${var.env}-${var.project}-${var.name}-access-identity"
}

data "aws_iam_policy_document" "s3_policy_cf_bucket" {
  count = var.isAccessViaCF ? 1 : 0
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.env}-${var.project}-${var.name}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.oai[0].iam_arn}"]
    }
  }
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.env}-${var.project}-${var.name}"

  tags = { for k, v in merge({
    public-facing = "yes",
    }, var.projectTags) : k => v
  }
}

resource "aws_s3_bucket_acl" "acl" {
  bucket = aws_s3_bucket.bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_policy" "policy" {
  count  = var.isAccessViaCF ? 1 : 0
  bucket = aws_s3_bucket.bucket.id
  policy = data.aws_iam_policy_document.s3_policy_cf_bucket[0].json
}

resource "aws_s3_bucket_cors_configuration" "core-rule" {
  count  = var.isAccessViaCF ? 1 : 0
  bucket = aws_s3_bucket.bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = [""]
  }
}

resource "aws_s3_bucket_website_configuration" "config" {
  count  = var.isWebApp ? 1 : 0
  bucket = aws_s3_bucket.bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "indext.html"
  }
}

resource "aws_s3_bucket_public_access_block" "access-block" {
  count  = var.isAccessViaCF ? 1 : 0
  bucket = aws_s3_bucket.bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "bucketRegionalDomainName" {
  value = aws_s3_bucket.bucket.bucket_regional_domain_name
}

output "cfOAI" {
  value = var.isAccessViaCF ? aws_cloudfront_origin_access_identity.oai[0].cloudfront_access_identity_path : ""
}

output "bucketDomainName" {
  value = aws_s3_bucket.bucket.bucket_domain_name
}
