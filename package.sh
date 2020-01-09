#!/bin/sh

git pull
rm -rf dist.zip

npm run build

zip -r dist.zip dist

echo "end"
