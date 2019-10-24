#!/bin/bash

#npm install
node index.js -i ../../trueblocks-core/src/other/build_assets/option-master-list.csv
node ./node_modules/aglio/bin/aglio.js -o ./output/docs.html -i ./output/apiary.generated.apib
cp -f ./output/docs.html ../api/docs/index.html
cp -f ./output/apiOptions.generated.json ../api/apiOptions.generated.json
rm -fR ../frontend/public/docs
cp -fR ../api/docs ../frontend/public ; echo
