const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = 80;
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/txIndex', (req, res) => {
    
    if (req.query.address.length != 42)
        return res.send({status: "err", message: "Expecting an Ethereum address 42 characters long."});
  
    let acctScrape = spawn("acctScrape", ['--list', '--nocolor', req.query.address]);

    acctScrape.stdout.pipe(res).on('exit', (code) => {
        console.log(`acctScrape exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

app.post('/init', (req, res) => {
    
    if (!req.query.address)
        return res.send({status: "err", message: "No address provided."});
    if (req.query.address.length != 42)
        return res.send({status: "err", message: "Expecting an Ethereum address 42 characters long."});

    let chifra = spawn("chifra", ['init', req.query.address]);

    chifra.stdout.pipe(res).on('exit', (code) => {
        console.log(`chifra init exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })
})

// app.get('/export')

app.listen(port, () => {
    console.log('We are live on ' + port);
});
