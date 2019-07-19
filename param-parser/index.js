const debug = true;
const templateHandlers = require('./components/templateHandlers');
const routeToToolMap = require('./routeToToolMap.json');
const parseInput = require('./components/inputParser').parseInput;

let jobs = [
  {
    name: "apiary",
    templateFilepath: "../apiary.template.apib",
    outputFilepath: "../apiary.generated.apib",
    do: templateHandlers.docsHandler
  },
  {
    name: "express api",
    templateFilepath: "../src/server.template.js",
    outputFilepath: "../src/server.generated.js",
    do: templateHandlers.apiHandler
  }
];

let main = async () => {
  let inputData = await parseInput();
  jobs.map(async job => {
    try{
      job.do(job.templateFilepath, job.outputFilepath, inputData, routeToToolMap)
    } catch(e) {
      console.log(e)
    }
  })
}

main();