const utils = require('./utils');

const inputParser = async (data) => {
  let rx = /.*\/(.*)\/options.cpp.*\(\"(.*)\"\,.*\"(.*)\"\)\,/;
  let lines = data.split("\n");
  let parsedLines = lines.map(line => {
      line = rx.exec(line);
      if (line === null)
        return null;

      // parsing option names deserves careful inspection.
      // if the first character is an ~, it's a required parameter.
      // if it's an @, it's hidden in the quickblocks menu.
      // if it's an !, it's required.
      console.log(line[2]);
      let param = line[2].split(":");
      let firstChar = param[0].charAt(0);
      let option = param[0] !== undefined ? param[0].replace(/[^\w\s]/gi, '') : '';
      let dataType = param[1];
      let optionType = firstChar === "~" ? "main" : "optional";
      return {
        "tool": line[1],
        "option": option,
        "desc": line[3],
        "dataType": dataType || "boolean",
        "optionType": optionType || "optional"
      }
    }).filter(row => row !== null);
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
