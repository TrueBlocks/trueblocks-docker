const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = 8080;
let debug = false;
let env = Object.create( process.env );
app.use(bodyParser.json());
app.use(bodyParser.text());

const checkDebug = (req) => {
    console.log(req.query.debug)
    if(req.query.debug === undefined)
        return false;
    env.TEST_MODE = true;
    return true;
}

app.get('/', (req, res) => {
    return res.send(`Welcome to TrueBlocks!\n
    Try one of the following:\n
    \t /list?address=0x5894110995b8c8401bd38262ba0c8ee41d4e4658\n
    \t /export?address=0x5894110995b8c8401bd38262ba0c8ee41d4e4658\n`);
})

app.get('/list', (req, res) => {
    debug = !debug && checkDebug(req);
   
    debugMsg = {
        received: debug && res.write("Got your request.\n"),
        started: debug && res.write("Starting chifra list...\n"),
    }

    debugMsg.received;
    if (req.query.address.length != 42)
        return res.send({status: "err", message: "Expecting an Ethereum address 42 characters long.\n"});

    debugMsg.started;
    let chifra = spawn("chifra", ['list', req.query.address, '--nocolor'],  {env: env});

    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra list" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })

})

app.get('/export', (req, res) => {
    debug = !debug && checkDebug(req);
   
    debugMsg = {
        received: debug && res.write("Got your request.\n"),
        started: debug && res.write("Starting chifra export...\n"),
    }
    
    debugMsg.received;
    if (req.query.address.length != 42)
        return res.send({status: "err", message: "Expecting an Ethereum address 42 characters long.\n"});

    let chifra = spawn("chifra", ['export', req.query.address, '--nocolor'], {env: env});
    debugMsg.started;
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra export" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })

})

app.get('/ls', (req, res) => {

    debug = !debug && checkDebug(req);
   
    debugMsg = {
        received: debug && res.write("Got your request.\n"),
        started: debug && res.write("Starting chifra ls...\n"),
    }

    var longList = ""
    if (req.query.ll)
        longList = "-l";
    debugMsg.received;
    let chifra = spawn("chifra", ['ls', '--nocolor', longList], {env: env});
    
    debugMsg.started;
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra ls" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.listen(port, () => {
    console.log('TrueBlocks API initialized on port ' + port);
});
