const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = 80;
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/', (req, res) => {
    return res.send(`Welcome to TrueBlocks!\n
    Try one of the following:\n
    \t /list?address=0x5894110995b8c8401bd38262ba0c8ee41d4e4658\n
    \t /export?address=0x5894110995b8c8401bd38262ba0c8ee41d4e4658\n`);
})

app.get('/list', (req, res) => {
    
    if (req.query.address.length != 42)
        return res.send({status: "err", message: "Expecting an Ethereum address 42 characters long."});
  
    //let acctScrape = spawn("acctScrape", ['--list', '--nocolor', req.query.address]);
    let acctScrape = spawn("chifra", ['list', '--nocolor', req.query.address]);

    acctScrape.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra list" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.get('/export', (req, res) => {
    if (req.query.address.length != 42)
    return res.send({status: "err", message: "Expecting an Ethereum address 42 characters long."});

    let chifra = spawn("chifra", ['export', '--nocolor', req.query.address]);
    
    chifra.stdout.pipe(res).on('finish', (code) => {
        console.log(`"chifra export" exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.listen(port, () => {
    console.log('We are live on ' + port);
});
