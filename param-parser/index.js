// ./tools/getReceipt/options.cpp:    COption("~!trans_list",    "a space-separated list of one or more transaction identifiers (tx_hash, bn.txID, blk_hash.txID)"),
// ./tools/getReceipt/options.cpp:    COption("-articulate",     "articulate the transactions if an ABI is found for the 'to' address"),
// ./tools/getReceipt/options.cpp:    COption("-logs",           "display the receipt's logs"),
// ./tools/getReceipt/options.cpp:    COption("@fmt:<fmt>",      "export format (one of [none|json|txt|csv|api])"),

const stdin = process.openStdin();

let data = "";

stdin.on('data', (chunk) => {
  data += chunk;
});

stdin.on('end', () => {
  let rx = /.*\/(.*)\/options.cpp.*\(\"(.*)\"\,.*\"(.*)\"\)\,/;
  let lines = data.split("\n");
  let reglines = lines.map(line => {
      line = rx.exec(line);
      if (line === null)
        return null;
      return {
        "tool": line[1],
        "option": line[2],
        "desc": line[3]
      }
    });
console.log(reglines);
});

