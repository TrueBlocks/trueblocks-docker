const parseInput = require('./components/inputParser').parseInput;
const templateHandlers = require('./components/templateHandlers');
const yargs = require('yargs');

const argv = yargs
  .option('inputFile', {
    alias: 'i',
    description: 'Specify input file',
    type: 'string',
  })
  .help()
  .alias('help', 'h')
  .argv;

let jobs = [
  {
    name: "generate api docs",
    templateFilepath: "../templates/apiary.template.apib",
    outputFilepath: "./output/apiary.generated.apib",
    do: templateHandlers.docsHandler
  },
  {
    name: "generate route json for express api",
    templateFilepath: null,
    outputFilepath: "./output/apiOptions.generated.json",
    do: templateHandlers.apiHandler
  },
];

let main = async () => {
  let inputData = await parseInput(argv.inputFile);
  jobs.map(async job => {
    try {
      job.do(job.templateFilepath, job.outputFilepath, inputData)
    } catch (e) {
      console.log(e)
    }
  })
}

main();
