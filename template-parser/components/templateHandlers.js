const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const warnings = require('./warnings');
const utils = require('./utils');

module.exports.apiHandler = async (templateFilepath, outputFilepath, data, routeToToolMap) => {
  let result = JSON.stringify(data, null, 2);
  try {
    // let template = await readFile(templateFilepath);
    // template = template.toString();
    // let rx = /\<\<GENERATE:(.*):(.*)\>\>/g;      
    // let result = template.replace(rx, replacer);
    await writeFile(outputFilepath, result);
    console.log(`Generated output written to ${outputFilepath}`);
  } catch (e) {
    console.log("error", e);
  }
}

module.exports.docsHandler = async (templateFilepath, outputFilepath, data, routeToToolMap) => {

  let replacer = (match, type, routeName) => {  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
    
    console.log(`routeName: ${routeName}`);
    // if(routeToToolMap[routeName] === undefined) 
    //   throw(`ERROR: no mapping for ${routeName} in the route to tool map.`);
    // data = data.filter(param => param.option !== '' & param.api_visible == "FALSE")


    let routeData = data[routeName];
    if(routeData === undefined) throw(`ERROR: no parameters defined for ${routeName} in csv.`)
    let params = routeData
        .filter(param => param.option !== '' & // no empty parameter names. these aren't parameters, they are tool description.
          param.api_visible // don't show hidden options
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
        return `    + ${param.command}: ${param.exampleData} (${param.api_required ? "required" : "optional"}, ${param.option_type}) - ${param.description_core}`
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

