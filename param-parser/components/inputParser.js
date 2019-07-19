const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const utils = require('./utils');
const debug = true;


const inputParser = async (data) => {
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

module.exports.parseInput = async () => {
  const stdin = process.openStdin();
  let data = "";
  stdin.on('data', (chunk) => {
    data += chunk;
  });
  let end = new Promise((resolve, reject) => {
    stdin.on('end', async () => {
      let parsedInput = await inputParser(data);
      return resolve(parsedInput);
    })
  });
  return await end;
}
