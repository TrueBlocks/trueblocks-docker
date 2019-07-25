const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = !isNaN(process.argv[2]) ? process.argv[2] : 8080;
const apiOptions = require('./apiOptions.generated.json');
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

const generateCmd = (queryObj) => {
    let cmd = Object.entries(queryObj).map(([key, val]) => {
        let option = apiOptions[key];
        let cmdString = [];
        if(option.optionType === "main") {
            cmdString.push(val);
        } else if(option.dataType === "flag") {
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

let routes = ["export", "list", "accounts", "blocks", "transactions", "logs", "receipts", "traces", "slurp", "abi", "state", "quotes"]

Object.keys(apiOptions).map((routeName) => {
    return app.get(`/${routeName}`, (req, res) => {
        let cmd = generateCmd(req.query);
        let chifra = spawn("chifra", [routeName, cmd], {env: env});
        chifra.stderr.pipe(process.stderr);
        chifra.stdout.pipe(res).on('finish', (code) => {
            reportAndSend(routeName, code, res);
        })
    })
})

app.get('/export', (req, res) => {   
    let opts = <<GENERATE:QUERYHELPER:export>>;
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['export', cmd], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("export", code, res);
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
    let chifra = spawn("chifra", ['data', '--message', `${id}`], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("message", code, res);
    })
})



app.listen(port, () => {
    console.log('TrueBlocks Data API initialized on port ' + port);
});
