const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const blueprintReplace = require('./replacers/blueprintReplace').blueprintReplace;
const routeToToolMap = require('./routeToToolMap.json');
const debug = true;

let jobs = [
  {
    name: "apiary",
    templateFilepath: "../apiary.template.apib",
    outputFilepath: "../apiary.generated.apib",
    do: blueprintReplace
  }
];

const stdin = process.openStdin();

let data = "";

stdin.on('data', (chunk) => {
  data += chunk;
});

stdin.on('end', async () => {
  let rx = /.*\/(.*)\/options.cpp.*\(\"(.*)\"\,.*\"(.*)\"\)\,/;
  let lines = data.split("\n");
  let reglines = lines.map(line => {
      line = rx.exec(line);
      if (line === null)
        return null;
      let param = line[2].split(":");
      let paramName = param[0];
      let paramType = param[1];
      let rx2 = /[^\w\s]/gi;
      paramName = paramName !== undefined ? paramName.replace(rx2, '') : '';
      return {
        "tool": line[1],
        "option": paramName,
        "desc": line[3],
        "type": paramType || "boolean",
        "isRequired": false
      }
    }).filter(row => row !== null);
  
    if(debug) {
      // console.log(reglines.map(line => line.option));
      await writeFile("params.txt", reglines.map(line => line.option).join('\n'));
    }
    
  
    var groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    reglines = groupBy(reglines, 'tool')

  // console.log(reglines);
  try {
  await jobs[0].do(jobs[0].templateFilepath, jobs[0].outputFilepath, reglines, routeToToolMap);
  } catch {(e) => {
    console.log(e);
  }}
});

