@echo off

set folder=".terraform"
set file=".terraform.lock.hcl"

IF EXIST %folder% (
    rmdir %folder% /s /q
)
IF EXIST %file% (
    del %file%
)
echo "Clean up finished!!!"

terraform init

echo "Init finished!!!"