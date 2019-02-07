const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = 80;
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/address/:address', (req, res) => {
    
    if (req.params.address.length != 42)
        return res.send({status: "err", message: "Expecting an Ethereum address 42 characters long."});
  
    let acctScrape = spawn("acctScrape", ['--list', '--nocolor', req.params.address]);

    acctScrape.stdout.on('data', (chunk) => {
        console.log(`data being written: ${chunk}`)
        return res.write(chunk);
    })
    acctScrape.stderr.on('data', (err) => {
        console.log(`error being written: ${err}`);
        return res.write(err);
    })

    acctScrape.on('exit', (code) => {
        console.log(`exiting: ${code}`);
        console.log(`child process exited with code ${code}`);
        return res.end();
    })

})

app.listen(port, () => {
    console.log('We are live on ' + port);
});
