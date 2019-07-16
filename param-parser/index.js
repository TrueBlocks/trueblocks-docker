const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const debug = true;

// { tool: 'getBlock',
//     option: '~block_list',
//     desc: 'a space-separated list of one or more blocks to retrieve',
//     type: 'bool',
//     isRequired: false },
//   { tool: 'getBlock',
//     option: '-hash_o(n)ly',
//     desc:
//      'display only transaction hashes, default is to display full transaction detail',
//     type: 'bool',
//     isRequired: false },

const stdin = process.openStdin();

let data = "";

const blueprintReplace = async (templateFilepath, outputFilepath, data, routeToToolMap) => {
  
  let replacer = (match, type, routeName) => {  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
    if(routeToToolMap[routeName] === undefined) 
    throw(`ERROR: no mapping for ${routeName} in the route to tool map.`);
    let params = routeToToolMap[routeName]
      .map(toolName => data[toolName]
        .filter(param => param.option != '') // no empty parameter names. these aren't parameters, they are tool description.
        ) 
      .reduce((acc, val) => acc.concat(val), []); // flatten
    
    if(type === "URI") {
      let paramsFormatted = params.map(param => {
        return `{?${param.option}}`
      }).join("");
      return `/${routeName}${paramsFormatted}`;
    }

    else if(type === "PARAMS") {  
      let paramsFormatted = params.map(param => {
        param.exampleData = '';
        return `    + ${param.option}: ${param.exampleData} (${param.isRequired ? "required" : "optional"}, ${param.type}) - ${param.desc}`
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

let jobs = [
  {
    name: "apiary",
    templateFilepath: "../apiary.apib",
    outputFilepath: "../apiary.generated.apib",
    do: blueprintReplace
  }
];

let routeToToolMap = {
  "export": ["acctScrape", "cacheMan"],
  "ls": ["acctScrape", "cacheMan"],
  "list": ["acctScrape", "cacheMan"],
  "account": ["acctExport"],
  "block": ["getBlock"]
}

stdin.on('data', (chunk) => {
  data += chunk;
});

stdin.on('end', async () => {
  let rx = /.*\/(.*)\/options.cpp.*\(\"(.*)\"\,.*\"(.*)\"\)\,/;
  let lines = data.split("\n");
  let reglines = lines.map(line => {
      line = rx.exec(line);
      if (line === null)
        return null;
      let param = line[2].split(":");
      let paramName = param[0];
      let paramType = param[1];
      let rx2 = /[^\w\s]/gi;
      paramName = paramName !== undefined ? paramName.replace(rx2, '') : '';
      return {
        "tool": line[1],
        "option": paramName,
        "desc": line[3],
        "type": paramType || "boolean",
        "isRequired": false
      }
    }).filter(row => row !== null);
  
    if(debug) {
      // console.log(reglines.map(line => line.option));
      await writeFile("params.txt", reglines.map(line => line.option).join('\n'));
    }
    
  
    var groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    reglines = groupBy(reglines, 'tool')

  // console.log(reglines);
  
  jobs[0].do(jobs[0].templateFilepath, jobs[0].outputFilepath, reglines, routeToToolMap);
});

