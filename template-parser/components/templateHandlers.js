const fs = require('fs');
const util = require('util');
const glob = require('glob');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const utils = require('./utils');
const dataShapers = require('./dataShapers');

module.exports.cppHandler = async (templateFilepath, outputFilepath, data) => {
  data = dataShapers.byTool(data);

  // let files = [];
  let files = glob.sync(templateFilepath + '**/options.cpp', {})

  return await Promise.all(files.map(async filepath => {
    let path = filepath.split('/');
    let toolName = path[path.length - 2];
    let toolData = data[toolName];
    if(toolData === undefined) {
      console.log(`no parameters defined for ${toolName} in csv. skipping...`);
      return true;
    } 

    let paramsFormatted = toolData.map((option) => {
      let OPTS = [];
      if(option.core_required) {
        OPTS.push("OPT_REQUIRED");
      } else {
        // OPTS.push("OPT_OPTIONAL");
      }
      if(!option.core_visible) OPTS.push("OPT_HIDDEN");
      if(option.option_kind === "switch") {
        option.data_type = "";
        OPTS.push("OPT_SWITCH");
      } else if(option.option_kind === "flag") {
        OPTS.push("OPT_FLAG");
      } else if(option.option_kind === "positional") {
        OPTS.push("OPT_POSITIONAL")
      }
      if(OPTS.length === 0) {
        OPTS = 0
      } else {
        OPTS = OPTS.join(" | ")
      }

      return `    COption2("${option.command}", "${option.command_short}", "${option.data_type}", ${OPTS}, "${option.description_core}"),\n`
    }).join("");

    let replacer = (match) => {
      return `\/\/ BEG_CODE_OPTIONS\n${paramsFormatted}\/\/ END_CODE_OPTIONS`
    }

    try {
      let template = await readFile(filepath);
      template = template.toString();
      let rx = /\/\/ BEG_CODE_OPTIONS[\s\S]*\/\/ END_CODE_OPTIONS/g;
      let result = template.replace(rx, replacer);
      await writeFile(filepath, result);
      return console.log(`Generated output written to ${filepath}`);
    } catch (e) {
      return console.log("e", e);
    }
    }));
}

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
    if(routeData === undefined) throw(`ERROR: no parameters defined for ${routeName} in csv.`)
    let params = [...routeData, ...data.all]
        .filter(param => param.command !== '' & // no empty parameter names. these aren't parameters, they are tool description.
          param.api_visible // don't show hidden options
        )
      .reduce((acc, val) => acc.concat(val), []); // flatten

    // format for GENERATE:URI
    if(type === "URI") {
      let paramsFormatted = params.map(param => {
        return `{?${param.command}}`
      }).join("");
      return `/${routeName}${paramsFormatted}`;
    }

    // format for GENERATE:PARAMS
    else if(type === "PARAMS") {  
      let paramsFormatted = params.map(param => {
        param.exampleData = '';
        return `    + ${param.command}: (${param.api_required ? "required" : "optional"}, ${param.data_type}) - ${param.description_core}`
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

