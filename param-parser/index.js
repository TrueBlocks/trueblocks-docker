const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const groupBy = require('./helpers/groupBy').groupBy;
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

const parseInput = async (data) => {
  let rx = /.*\/(.*)\/options.cpp.*\(\"(.*)\"\,.*\"(.*)\"\)\,/;
  let lines = data.split("\n");
  let parsedLines = lines.map(line => {
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
      await writeFile("params.txt", parsedLines.map(line => line.option).join('\n'));
    }
    return groupBy(parsedLines, 'tool');
}
stdin.on('end', async () => {
  let parsedInput = await parseInput(data);
  try {
    await jobs[0].do(jobs[0].templateFilepath, jobs[0].outputFilepath, parsedInput, routeToToolMap);
  } catch {(e) => {
    console.log(e);
  }}
});

