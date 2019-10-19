const fs = require('fs');
const util = require('util');
const glob = require('glob');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const utils = require('./utils');
const dataShapers = require('./dataShapers');

module.exports.apiHandler = async (templateFilepath, outputFilepath, data) => {
  data = dataShapers.byRoute(data);
  let newData = {}
  let globalFlags = utils.groupBy(data.all, "command");

  Object.keys(data).map((routeName) => {
    newData[routeName] = {}
    let d = utils.groupBy(data[routeName], "command");
    Object.keys(d).map(k => {
      newData[routeName][k] = d[k][0];
    });
    Object.keys(globalFlags).map(k => {
      newData[routeName][k] = globalFlags[k][0];
    })
  })
  let result = JSON.stringify(newData, null, 2);
  try {
    await writeFile(outputFilepath, result);
    console.log(`Generated output written to ${outputFilepath}`);
  } catch (e) {
    console.log("error", e);
  }
}

module.exports.docsHandler = async (templateFilepath, outputFilepath, data) => {

  data = dataShapers.byRoute(data);

  let replacer = (match, type, routeName) => {  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter

    console.log(`routeName: ${routeName}`);

    let routeData = data[routeName];
    if (routeData === undefined) throw (`ERROR: no parameters defined for ${routeName} in csv.`)
    let params = [...routeData, ...data.all]
      .filter(param => param.command !== '' & // no empty parameter names. these aren't parameters, they are tool description.
        param.docs_visible // don't show hidden options
      )
      .reduce((acc, val) => acc.concat(val), []); // flatten

    // format for GENERATE:URI
    if (type === "URI") {
      let paramsFormatted = params.map(param => {
        return `{?${param.command}}`
      }).join("");
      return `/${routeName}${paramsFormatted}`;
    }

    // format for GENERATE:PARAMS
    else if (type === "PARAMS") {
      let paramsFormatted = params.map(param => {
        param.exampleData = '';

        return `    + \`${param.command}\` (${param.is_required ? "required" : "optional"}, ${param.data_type}) - ${param.description}`
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
