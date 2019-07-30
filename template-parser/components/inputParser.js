const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const utils = require('./utils');

const inputParser = async (data) => {
  let lines = parse(data, {delimiter: ',', columns: true});
  let parsedLines = lines.map(item => {
      item.option = item.command;
      item.desc = item.description_core;
      item.dataType = item.input_type;
      item.optionType = item.option_type;
      return item;
    }).filter(row => row !== null);
  
  data = parsedLines.reduce((acc, cur) => {
      let routes = cur.api_route.split(",");
      routes.map((route) => {
        let obj = cur;
        obj.api_route = route;
        acc.push(cur);
      })
      return acc;
    }, [])
  return utils.groupBy(data, 'api_route');  
}

module.exports.parseInput = async (inputFile) => {
  // const stdin = process.openStdin();
  const data = await readFile(inputFile);
  return await inputParser(data);
}
