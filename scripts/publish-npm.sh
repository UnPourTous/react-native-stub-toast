#!/bin/bash

git add -A
git commit

version=`npm version patch`
npm publish --access public --verbose
git push 
git push --tag
