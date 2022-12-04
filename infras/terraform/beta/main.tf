locals {
  data         = jsondecode(file("${path.module}/../../provider.json"))
  providerData = merge(local.data.common, try(local.data[var.env], {}))

  s3DAppKey             = [for k, v in local.providerData.S3 : k if v.NAME == local.providerData.S3.CODE_CAMP.NAME][0]
  s3DistributionLogsKey = [for k, v in local.providerData.S3 : k if v.NAME == local.providerData.S3.DISTRIBUTION_LOGS.NAME][0]

  tags  = merge({ environment = var.env }, local.providerData.TAGS)
  owner = local.providerData.INSTITUTIONS.PRINCIPLE
}

module "acm" {
  for_each    = try(local.providerData.DOMAINS, {})
  source      = "../../../../modules/terraform/acm"
  projectTags = merge({ project-name = "${local.owner}" }, local.tags)
  domainName  = each.value.NAME
  domainAlias = try(each.value.ALIAS, [])
  providers = {
    aws = aws.virginia
  }
}

module "iamUser" {
  for_each    = local.providerData.IAM_USERS
  source      = "../../../../modules/terraform/iamUser"
  projectTags = merge({ project-name = "${local.owner}", }, local.tags)
  project     = local.owner
  env         = var.env
  name        = each.value.NAME
  providers = {
    aws = aws.singapore
  }
}


module "sns" {
  for_each    = local.providerData.SNS
  source      = "../../../../modules/terraform/sns"
  project     = local.owner
  env         = var.env
  endpoints   = try(each.value.ENDPOINTS, "")
  protocol    = try(each.value.PROTOCOL, "")
  name        = each.value.NAME
  projectTags = merge({ project-name = "${local.owner}", }, local.tags)
  providers = {
    aws = aws.singapore
  }
}

module "s3Buckets" {
  source        = "../modules/s3"
  for_each      = local.providerData.S3
  projectTags   = merge({ project-name = "${local.owner}", }, local.tags)
  project       = local.owner
  env           = var.env
  name          = each.value.NAME
  isWebApp      = each.value.IS_WEB_APP
  isAccessViaCF = each.value.IS_ACCESS_VIA_CF
  providers = {
    aws = aws.singapore
  }
}

module "cloudfrontDistributions" {
  for_each    = local.providerData.CLOUDFRONT
  source      = "../modules/cloudfront"
  projectTags = merge({ project-name = "${local.owner}", }, local.tags)
  project     = local.owner
  env         = var.env
  name        = each.value.NAME
  acm         = try(module.acm[each.key], "")
  s3Buckets   = module.s3Buckets[each.key]
  logBucket   = module.s3Buckets[local.s3DistributionLogsKey]
  domain      = try(local.providerData.DOMAINS[each.key].NAME, "")
  snsArn      = module.sns["MONITORING"].arn
  providers = {
    aws = aws.singapore
  }
}
