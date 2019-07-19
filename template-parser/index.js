const parseInput = require('./components/inputParser').parseInput;
const templateHandlers = require('./components/templateHandlers');
const routeToToolMap = require('./routeToToolMap.json');


let jobs = [
  {
    name: "apiary",
    templateFilepath: "./templates/apiary.template.apib",
    outputFilepath: "./output/apiary.generated.apib",
    do: templateHandlers.docsHandler
  },
  {
    name: "express api",
    templateFilepath: "./templates/server.template.js",
    outputFilepath: "./output/server.generated.js",
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