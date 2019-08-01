const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const utils = require('./utils');

const inputParser = async (data) => {
  let lines = parse(data, {delimiter: ',', columns: true});
  let parsedLines = lines.map(item => {
      item.api_enabled = item.api_enabled === "TRUE" ? true : false;
      item.api_required = item.api_required === "TRUE" ? true : false;
      item.api_visible = item.api_visible === "TRUE" ? true : false;
      item.core_required = item.core_required === "TRUE" ? true : false;
      item.core_visible = item.core_visible === "TRUE" ? true : false;
      return item;
    }).filter(row => row !== null);
  
  return parsedLines;
}

module.exports.parseInput = async (inputFile) => {
  const data = await readFile(inputFile);
  return await inputParser(data);
}
