const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/address', (req, res) => {

    let acctScrape = spawn("acctScrape", ['--list', '0x2e18e2d31f14c78a9d1f8bb687c3e0dd71ad6391']);

    acctScrape.stdout.on('data', (data) => {
        console.log(`data being written: ${data}`)
        return res.write(data);
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