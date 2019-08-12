#!/bin/bash

#npm install
node index.js -i ../../trueblocks-core/src/other/build_assets/option-master-list.csv
node ./node_modules/aglio/bin/aglio.js -o ./output/docs.html -i ./output/apiary.generated.apib
cp ./output/docs.html ../api/docs/index.html
cp ./output/apiOptions.generated.json ../api/apiOptions.generated.json
