
variable "projectTags" {}
variable "env" {}
variable "project" {}
variable "name" {}
variable "acm" {}
variable "s3Buckets" {}
variable "logBucket" {}
variable "domain" {}
variable "snsArn" {}

locals {
  s3OriginId   = "default-s3-origin"
  webBehaviour = []
}

resource "aws_cloudfront_response_headers_policy" "response_headers" {
  name = "${var.env}-${var.project}-${var.name}-cache-policy"

  custom_headers_config {
    items {
      header   = "Cache-Control"
      override = true
      value    = "public,max-age=31536000,immutable"
    }
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = var.s3Buckets["bucketRegionalDomainName"]
    origin_id   = local.s3OriginId
    origin_path = ""
    s3_origin_config {
      origin_access_identity = var.s3Buckets["cfOAI"]
    }
  }

  is_ipv6_enabled     = true
  enabled             = true
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = var.logBucket.bucketDomainName
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3OriginId

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  dynamic "ordered_cache_behavior" {
    for_each = toset(local.webBehaviour)
    content {
      path_pattern     = ordered_cache_behavior.value
      allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
      cached_methods   = ["GET", "HEAD"]
      target_origin_id = local.s3OriginId

      forwarded_values {
        query_string = false

        cookies {
          forward = "none"
        }
      }

      min_ttl                    = 0
      default_ttl                = 0
      max_ttl                    = 0
      compress                   = true
      viewer_protocol_policy     = "redirect-to-https"
      response_headers_policy_id = aws_cloudfront_response_headers_policy.response_headers.id
    }
  }
  aliases = var.domain != "" ? [var.domain, "www.${var.domain}"] : []

  viewer_certificate {
    cloudfront_default_certificate = var.acm != "" ? false : true
    acm_certificate_arn            = var.acm != "" ? var.acm.acmArn : ""
    ssl_support_method             = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  lifecycle {
    ignore_changes = all
  }

  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }
  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  tags = { for k, v in var.projectTags : k => v }
}

resource "aws_cloudwatch_metric_alarm" "main_distribution_4xx_alarm" {
  alarm_name          = "${var.env}-${var.project}-cdn-main-distribution-400-errors-alarm"
  alarm_description   = "400 error rate on ${var.env} main distribution."
  evaluation_periods  = 3
  threshold           = 10
  period              = "300"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  statistic           = "Average"
  namespace           = "AWS/CloudFront"
  metric_name         = "4xxErrorRate"
  treat_missing_data  = "notBreaching"
  dimensions = {
    DistributionId = aws_cloudfront_distribution.s3_distribution.id
  }
  unit          = "Count"
  alarm_actions = [var.snsArn]

  tags = { for k, v in var.projectTags : k => v }
}

resource "aws_cloudwatch_metric_alarm" "_5xx_alarm" {
  alarm_name          = "${var.env}-${var.project}-cdn-main-distribution-500-errors-alarm"
  alarm_description   = "500 error rate on ${var.env} main distribution."
  evaluation_periods  = 3
  threshold           = 10
  period              = "300"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  statistic           = "Average"
  namespace           = "AWS/CloudFront"
  metric_name         = "5xxErrorRate"
  treat_missing_data  = "notBreaching"
  dimensions = {
    DistributionId = aws_cloudfront_distribution.s3_distribution.id
  }
  unit          = "Count"
  alarm_actions = [var.snsArn]

  tags = { for k, v in var.projectTags : k => v }
}
