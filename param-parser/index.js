const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const utils = require('./utils');
const replacers = require('./replacers/blueprintReplace');
const routeToToolMap = require('./routeToToolMap.json');
const debug = true;

let jobs = [
  {
    name: "apiary",
    templateFilepath: "../apiary.template.apib",
    outputFilepath: "../apiary.generated.apib",
    do: replacers.blueprintReplace
  },
  {
    name: "express api",
    templateFilepath: "../src/server.template.js",
    outputFilepath: "../src/server.generated.js",
    do: replacers.apiReplace
  }
];

const parseInput = async (data) => {
  let rx = /.*\/(.*)\/options.cpp.*\(\"(.*)\"\,.*\"(.*)\"\)\,/;
  let lines = data.split("\n");
  let parsedLines = lines.map(line => {
      line = rx.exec(line);
      if (line === null)
        return null;
      let param = line[2].split(":");
      let option = param[0] !== undefined ? param[0].replace(/[^\w\s]/gi, '') : '';
      let paramType = param[1];
      return {
        "tool": line[1],
        "option": option,
        "desc": line[3],
        "type": paramType || "boolean",
        "isRequired": false
      }
    }).filter(row => row !== null);
  
    if(debug) {
      // console.log(reglines.map(line => line.option));
      await writeFile("params.txt", parsedLines.map(line => line.option).join('\n'));
    }
    return utils.groupBy(parsedLines, 'tool');
}

const stdin = process.openStdin();

let data = "";

stdin.on('data', (chunk) => {
  data += chunk;
});

stdin.on('end', async () => {
  let parsedInput = await parseInput(data);
  try {
    await Promise.all(
      jobs.map(job => job.do(job.templateFilepath, job.outputFilepath, parsedInput, routeToToolMap))
    )
  } catch {(e) => {
    console.log(e);
  }}
});
