#!/bin/bash

npm install
node index.js -i ./misc/example.csv
node ./node_modules/snowboard/lib/main.js html -o ./output/docs.html ./output/apiary.generated.apib
cp ./output/docs.html ../api/docs/index.html
cp ./output/apiOptions.generated.json ../api/apiOptions.generated.json
