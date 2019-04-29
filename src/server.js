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

debug = "--verbose:3"
//debug = ""

app.get('/export', (req, res) => {
    if (req.query.address.length != 42)
        return res.send({status: "err", message: `Expecting an Ethereum address 42 characters long.`});
    let chifra = spawn("chifra", ['export', req.query.address, '--nocolor'], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra export" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.get('/list', (req, res) => {
    if (req.query.address.length != 42)
        return res.send({status: "err", message: 'Expecting an Ethereum address 42 characters long.' });

    let chifra = spawn("chifra", ['list', req.query.address, '--useBlooms', debug, '--nocolor'],  {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra list" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.get('/ls', (req, res) => {
    var longList = ""
    if (req.query.ll)
        longList = "-l";
    let chifra = spawn("chifra", ['ls', req.query.address, longList, debug, '--nocolor'], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra ls" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.get('/accounts', (req, res) => {
    req.query.search1 = req.query.search1 || '';
    req.query.search2 = req.query.search2 || '';
    let chifra = spawn("chifra", ['accounts', req.query.search1, req.query.search2, debug, '--nocolor'], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra names" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.get('/blocks', (req, res) => {
    let chifra = spawn("chifra", ['blocks', '--list', '--data', debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra blocks" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.get('/functions', (req, res) => {
    let chifra = spawn("chifra", ['functions', '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359', debug, '--nocolor'], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra blocks" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.listen(port, () => {
    console.log('TrueBlocks API initialized on port ' + port);
});
