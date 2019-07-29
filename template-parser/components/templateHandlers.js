const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const warnings = require('./warnings');
const utils = require('./utils');

module.exports.apiHandler = async (templateFilepath, outputFilepath, data, routeToToolMap) => {
  data = utils.groupBy(data, 'api_route');
  let result = JSON.stringify(data, null, 2);
  try {
    // let template = await readFile(templateFilepath);
    // template = template.toString();
    // let rx = /\<\<GENERATE:(.*):(.*)\>\>/g;      
    // let result = template.replace(rx, replacer);
    await writeFile(outputFilepath, result);
    console.log(`Generated output written to ${outputFilepath}`);
  } catch (e) {
    console.log("e", e);
  }
}

module.exports.docsHandler = async (templateFilepath, outputFilepath, data, routeToToolMap) => {

  let replacer = (match, type, routeName) => {  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
    
    console.log(`routeName: ${routeName}, ${routeToToolMap[routeName]}`);
    if(routeToToolMap[routeName] === undefined) 
      throw(`ERROR: no mapping for ${routeName} in the route to tool map.`);
    data = utils.groupBy(data, 'tool');
    let params = routeToToolMap[routeName]
      .map(toolName => data[toolName]
        .filter(param => param.option !== '' & // no empty parameter names. these aren't parameters, they are tool description.
          param.optionType !== "hidden" // don't show hidden options
        ) 
        )
      .reduce((acc, val) => acc.concat(val), []); // flatten
    
    // format for GENERATE:URI
    if(type === "URI") {
      let paramsFormatted = params.map(param => {
        return `{?${param.option}}`
      }).join("");
      return `/${routeName}${paramsFormatted}`;
    }

    // format for GENERATE:PARAMS
    else if(type === "PARAMS") {  
      let paramsFormatted = params.map(param => {
        param.exampleData = '';
        return `    + ${param.option}: ${param.exampleData} (${param.optionType !== "optional" ? "required" : "optional"}, ${param.dataType}) - ${param.desc}`
      }).join("\n");
      return paramsFormatted;
    }
  }

    try {
      let template = await readFile(templateFilepath);
      template = template.toString();
      let rx = /\<\<GENERATE:(.*):(.*)\>\>/g;      
      let result = template.replace(rx, replacer);
      await writeFile(outputFilepath, result);
      console.log(`Generated output written to ${outputFilepath}`);
    } catch (e) {
      console.log("e", e);
    }
  }

