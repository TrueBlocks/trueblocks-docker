const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const utils = require('./utils');

const inputParser = async (data) => {
  let lines = parse(data, { delimiter: ',', columns: true, skip_lines_with_error: true });
  let parsedLines = lines.map(item => {
    item.is_required   = (item.is_required   === "TRUE" || item.is_required     === "true") ? true : false;
    item.customizeable = (item.customizeable === "TRUE" || item.is_customizable === "true") ? true : false;
    item.docs_visible  = (item.docs_visible  === "TRUE" || item.docs_visible    === "true") ? true : false;
    item.core_visible  = (item.core_visible  === "TRUE" || item.core_visible    === "true") ? true : false;
    return item;
  }).filter(row => row !== null);

  return parsedLines;
}

module.exports.parseInput = async (inputFile) => {
  const data = await readFile(inputFile);
  return await inputParser(data);
}
