const parse = require('csv-parse/lib/sync');

const inputParser = async (data) => {
  let lines = parse(data, {delimiter: ',', columns: true});
  let parsedLines = lines.map(item => {
      item.option = item.command;
      item.desc = item.description_core;
      item.dataType = item.input_type;
      item.optionType = item.option_type;
      return item;
    }).filter(row => row !== null);
    return parsedLines;
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
