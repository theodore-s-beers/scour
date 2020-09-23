#! /usr/local/bin/bash

find . -name "*.ts" ! -path "./node_modules/*" -exec prettier --write {} \; &&
find . -name "*.ts" ! -path "./node_modules/*" -exec ts-standard --fix {} \; &&
echo "TypeScript standardized" &&

find . -name "*.js" ! -path "./node_modules/*" -exec prettier --write {} \; &&
find . -name "*.js" ! -path "./node_modules/*" -exec standard --fix {} \; &&
echo "JavaScript standardized"
