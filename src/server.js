const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = !isNaN(process.argv[2]) ? process.argv[2] : 8080;
let env = process.env;
env.API_MODE = true;
app.use(bodyParser.json());
app.use(bodyParser.text());

//var X = import("0x509fa8d8b2c7962bd9a8c32fb79dbdecf81b312b011be240903ccea3410f22a1.json")

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
    /ls
    /accounts/:id
    /blocks/:id
    /transactions/:id
    /logs/:id
    /receipts/:id
    /traces/:id
    /abi/:id
    /state/balance/:id
    /state/code/:id
    /state/nonce/:id
    /slurp/:id
    /quotes/:id
`);
})

var debug = "--verbose:6"
var cnt = 0;
function reportAndSend(routeName, code, res) {
    console.log(`"${routeName}" exiting: ${code === undefined ? "OK" : code}`);
    console.log(`------------- ${++cnt} ---------------------------`);
    return res.send();
}
//debug = ""

app.get('/export', (req, res) => {
    if (req.query.address.length != 42)
        return res.send({status: "err", message: `Expecting an Ethereum address 42 characters long.`});
    let chifra = spawn("chifra", ['export', req.query.address, '--nocolor'], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("export", code, res);
    })
})

app.get('/export2', (req, res) => {
    if (req.query.address.length != 42)
        return res.send({status: "err", message: `Expecting an Ethereum address 42 characters long.`});
    let chifra = spawn("chifra", ['export', req.query.address, '--output', '--nocolor'], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("export", code, res);
    })
})

app.get('/list', (req, res) => {
    if (req.query.address.length != 42)
        return res.send({status: "err", message: 'Expecting an Ethereum address 42 characters long.' });
    let chifra = spawn("chifra", ['list', req.query.address, debug, '--nocolor'],  {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("list", code, res);
    })
})

app.get('/list2', (req, res) => {
    if (req.query.address.length != 42)
        return res.send({status: "err", message: 'Expecting an Ethereum address 42 characters long.' });
    let chifra = spawn("chifra", ['list', req.query.address, '--output', debug, '--nocolor'],  {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("list", code, res);
    })
})

app.get('/ls', (req, res) => {
    var longList = ""
    if (req.query.ll)
        longList = "-l";
    let chifra = spawn("chifra", ['ls', req.query.address, longList, debug, '--nocolor'], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("ls", code, res);
    })
})

app.get('/accounts/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--accounts', `${id}`, debug, '--nocolor'], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("accounts", code, res);
    })
})

app.get('/blocks/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--blocks', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("blocks", code, res);
    })
})

app.get('/transactions/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    console.log(req.params.id);
    let chifra = spawn("chifra", ['data', '--trans', `${id}`, '--trace', '--articulate', '--fmt', 'json', debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("trans", code, res);
    })
})

app.get('/logs/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--logs', `${id}`, '--articulate', '--fmt', 'txt', '--output', debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("logs", code, res);
    })
})

app.get('/receipts/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--receipts', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("receipts", code, res);
    })
})

app.get('/traces/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--traces', `${id}`, '--articulate', '--fmt', 'txt', '--output', debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("traces", code, res);
    })
})

app.get('/slurp/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--slurp', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("slurp", code, res);
    })
})

app.get('/abi/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--abi', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("abi", code, res);
    })
})

app.get('/state/balance/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--balance', '--mode', 'some', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("balance", code, res);
    })
})

app.get('/state/code/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--code', '--mode', 'some', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("code", code, res);
    })
})

app.get('/state/nonce/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--nonce', '--mode', 'some', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("nonce", code, res);
    })
})

app.get('/quotes/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--quotes', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("slurp", code, res);
    })
})

app.listen(port, () => {
    console.log('TrueBlocks Data API initialized on port ' + port);
});
