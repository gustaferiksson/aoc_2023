#!/bin/bash

if ! [[ $1 =~ ^day(0[1-9]|1[0-9]|2[0-5])$ ]]; then echo "Invalid date." && exit 1; fi

echo $1
mkdir $1

cp template/index.ts $1
cp template/index.test.ts $1
cp template/Dockerfile $1
cp template/input.txt $1
cp template/package.json $1
cp template/tsconfig.json $1

grep -rl TEMPLATE $1 | xargs sed -i '' "s/TEMPLATE/$1/g"


(cd $1 && bun install)

git add --all $1
git commit -m "Setup template for $1"