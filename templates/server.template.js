const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = !isNaN(process.argv[2]) ? process.argv[2] : 8080;
let env = process.env;
env.API_MODE = true;
//env.TEST_MODE = true;
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/docs', express.static(__dirname + '/docs'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    return res.send(
`Welcome to TrueBlocks!
Try one of the following:
    /list?address=0x8ad69ae99804935d56704162e3f6a6f442d2ed4a
    /export?address=0x8ad69ae99804935d56704162e3f6a6f442d2ed4a
    /export_logs/:id
    /ls
    /accounts/:id
    /blocks/:id
    /transactions/:id
    /logs/:id
    /receipts/:id
    /traces/:id
    /tracecnt/:id
    /abi/:id
    /state/balance/:id
    /state/code/:id
    /state/nonce/:id
    /balances/:id
    /message/:bytes
    /slurp/:id
    /quotes/:id
`);
})

var cnt = 0;
function reportAndSend(routeName, code, res) {
    console.log(`"${routeName}" exiting: ${code === undefined ? "OK" : code}`);
    console.log(`------------- ${++cnt} ---------------------------`);
    return res.send();
}

const generateCmd = (opts, queryObj) => {
    let cmd = Object.entries(queryObj).map(([key, val]) => {
        let option = opts[key];
        let cmdString = [];
        if(option.optionType === "main") {
            cmdString.push(val);
        } else if(option.dataType === "boolean") {
            cmdString.push(`--${key}`)
        } else {
            cmdString.push(`--${key}`, val)
        }
        return cmdString;
    }).reduce((acc, val) => acc.concat(val), [])
    .join(' ');
    console.log(`command options passed to tool: ${cmd}`);
    return cmd;
}

app.get('/export', (req, res) => {   
    let opts = <<GENERATE:QUERYHELPER:export>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['export', cmd], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("export", code, res);
    })
})

app.get('/list', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:list>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['list', cmd],  {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("list", code, res);
    })
})

app.get('/ls', (req, res) => {
    var longList = ""
    if (req.query.ll)
        longList = "-l";
    let chifra = spawn("chifra", ['ls', req.query.address, longList], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("ls", code, res);
    })
})

app.get('/accounts', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:accounts>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['accounts', cmd], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("accounts", code, res);
    })
})

app.get('/blocks', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:blocks>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['blocks', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("blocks", code, res);
    })
})

app.get('/transactions', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:transactions>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['trans', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("transactions", code, res);
    })
})

app.get('/logs', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:logs>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['logs', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("logs", code, res);
    })
})

app.get('/receipts', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:receipts>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['receipts', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("receipts", code, res);
    })
})

app.get('/traces', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:traces>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['traces', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("traces", code, res);
    })
})

app.get('/slurp', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:slurp>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['slurp', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("slurp", code, res);
    })
})

app.get('/abi', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:abi>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['abi', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("abi", code, res);
    })
})

app.get('/state', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:state>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['data', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("state/nonce", code, res);
    })
})

app.get('/balances/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['balances', `${id}`], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("balances", code, res);
    })
})

app.get('/message/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
//    let chifra = spawn("chifra", ['data', '--message', `${id}`], { env: env });
    let chifra = spawn("chifra", ['data', '--message', `${id}`], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("message", code, res);
    })
})

app.get('/quotes', (req, res) => {
    let opts = <<GENERATE:QUERYHELPER:quotes>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['data', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("quotes", code, res);
    })
})

app.listen(port, () => {
    console.log('TrueBlocks Data API initialized on port ' + port);
});
