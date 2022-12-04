## Requirement
Terraform CLI: https://www.terraform.io/downloads.html
## Usage

```bash
terraform init
terraform fmt
terraform plan
terraform apply

terraform destroy

terraform apply -replace="module.main_module.module.dynamodb.aws_dynamodb_table.default[\`"module-name\`"]"
```



