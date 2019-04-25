const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = !isNaN(process.argv[2]) ? process.argv[2] : 80;
let debug = false;
let env = process.env;
app.use(bodyParser.json());
app.use(bodyParser.text());

const checkDebug = (req, res) => {
    console.log(req.query.debug)
    if(req.query.debug === undefined)
        return false;
    //res.write(`env: ${JSON.stringify(env, null, 2)}\n`);
    res.write(`| IS_DOCKER: ${env.IS_DOCKER}\n| RPC_PROVIDER: ${env.RPC_PROVIDER}\n`)
    return true;
}

app.get('/', (req, res) => {
    return res.send(
`Welcome to TrueBlocks!
Try one of the following:
    /list?address=0x8ad69ae99804935d56704162e3f6a6f442d2ed4a
    /export?address=0x8ad69ae99804935d56704162e3f6a6f442d2ed4a
`);
})

app.get('/list', (req, res) => {
    debug = !debug && checkDebug(req,res);

    if (req.query.address.length != 42)
        return res.send({status: "err", message: 'Expecting an Ethereum address 42 characters long.' });

    let chifra = spawn("chifra", ['list', req.query.address, '--useBlooms', '--nocolor'],  {env: env});
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra list" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.get('/export', (req, res) => {
    debug = !debug && checkDebug(req,res);

    if (req.query.address.length != 42)
        return res.send({status: "err", message: `Expecting an Ethereum address 42 characters long.`});
    let chifra = spawn("chifra", ['export', req.query.address, '--nocolor'], {env: env});

    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra export" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.get('/ls', (req, res) => {
    debug = !debug && checkDebug(req,res);

    var longList = ""
    if (req.query.ll)
        longList = "-l";

// address is optional don't know how to test
//    if (req.query.address.length != 42)
//        return res.send({status: "err", message: `Expecting an Ethereum address 42 characters long.`});
    let chifra = spawn("chifra", ['ls', '--nocolor', req.query.address, longList], {env: env});

    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra ls" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.listen(port, () => {
    console.log('TrueBlocks API initialized on port ' + port);
});
