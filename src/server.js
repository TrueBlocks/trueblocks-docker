const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = !isNaN(process.argv[2]) ? process.argv[2] : 8080;
let env = process.env;
env.API_MODE = true;
app.use(bodyParser.json());
app.use(bodyParser.text());

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
`);
})

var debug = "--verbose:6"
var cnt = 0;
function reportAndSend(routeName, code, res) {
    console.log(`"${routeName}" exiting: ${code === undefined ? "OK" : code}`);
    console.log(`------------- ${++cnt} ---------------------------`)
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

app.get('/list', (req, res) => {
    if (req.query.address.length != 42)
        return res.send({status: "err", message: 'Expecting an Ethereum address 42 characters long.' });

    let chifra = spawn("chifra", ['list', req.query.address, '--useBlooms', debug, '--nocolor'],  {env: env});
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
    let chifra = spawn("chifra", ['data', '--trans', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("trans", code, res);
    })
})

app.get('/logs/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--logs', `${id}`, debug, '--nocolor'], { env: env });
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
    let chifra = spawn("chifra", ['data', '--traces', `${id}`, debug, '--nocolor'], { env: env });
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

app.get('/prices/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['data', '--prices', `${id}`, debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("slurp", code, res);
    })
})

app.get('/functions', (req, res) => {
    let chifra = spawn("chifra", ['functions', '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359', debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("functions", code, res);
    })
})

app.listen(port, () => {
    console.log('TrueBlocks API initialized on port ' + port);
});
