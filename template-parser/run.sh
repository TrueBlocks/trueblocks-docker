#!/bin/bash

npm install
cat misc/example.csv | node index.js
node ./node_modules/snowboard/lib/main.js html -o ./output/docs.html ./output/apiary.generated.apib
cp ./output/docs.html ../api/docs/index.html
cp ./output/server.generated.js ../api/server.generated.js
