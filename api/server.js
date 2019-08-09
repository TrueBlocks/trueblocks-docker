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
    return res.redirect('/docs');
})

var cnt = 0;
function reportAndSend(routeName, code, res) {
    console.log(`"${routeName}" exiting: ${code === undefined ? "OK" : code}`);
    console.log(`------------- ${++cnt} ---------------------------`);
    return res.send();
}

const generateCmd = (routeName, queryObj) => {
    let cmd = Object.entries(queryObj).map(([key, val]) => {
        let option = apiOptions[routeName][key];
        let cmdString = [];
        if(option === undefined) {
            console.log("apiOption[" + routeName + "][" + key + "] not found");
        } else if(option.api_required) {
            cmdString.push(val);
        } else if(option.option_kind === "switch") {
            cmdString.push(`--${key}`)
        } else {
            cmdString.push(`--${key}`, val)
        }
        return cmdString;
    }).reduce((acc, val) => acc.concat(val), [])
    .join(' ');
    console.log(`call: chifra ${routeName} ${cmd}`);
    return cmd;
}

app.get(`/:routeName`, (req, res) => {
    let routeName = req.params.routeName;
    if(apiOptions[routeName] === undefined) {
        return res.send("This route is not available.")
    }
    let cmd = generateCmd(routeName, req.query);
    let chifra = spawn("chifra", [routeName, cmd], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend(routeName, code, res);
})
})

app.listen(port, () => {
    console.log('TrueBlocks Data API initialized on port ' + port);
});
