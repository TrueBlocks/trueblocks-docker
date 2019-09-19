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
app.use('/', express.static(__dirname + '/build'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/', (req, res) => {
    return res.redirect('/docs');
})

let processList = []
let cnt = 0

const reportAndSend = (routeName, code, res) => {
    console.log(`"${routeName}" exiting: ${code === undefined ? "OK" : code}`);
    console.log(`------------- ${++cnt} ---------------------------`);
    return res.send();
}

const generateCmd = (routeName, queryObj) => {
    let cmd = Object.entries(queryObj).map(([key, val]) => {
        let option = apiOptions[routeName][key];
        let cmdString = [];
        if(option === undefined) {
            console.log("\x1b[31m", "apiOption[" + routeName + "][" + key + "] not found", "\x1b[0m");
            cmdString.push(`--${key}`, val);
        } else if(option.option_kind === "positional") {
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

const removeFromProcessList = (pid) => {
    processList = processList.filter(process => process.pid !== pid);
}

app.get(`/ps`, (req, res) => {
    // if(req.query.kill !== undefined) {
    //     console.log("killing ", req.query.kill)
    // }
    res.send(processList)
})

app.get(`/:routeName`, (req, res) => {
    let routeName = req.params.routeName;
    if(apiOptions[routeName] === undefined) {
        return res.send("This route is not available.")
    }
    let cmd = generateCmd(routeName, req.query);
    let chifra = spawn("chifra", [routeName, cmd], {env: env, detached: true});
    req.on('close', (err) => {
        console.log(`killing ${-chifra.pid}...`)
	try {
            process.kill(-chifra.pid, 'SIGINT')
	} catch (e) {
	    console.log(`error killing process: ${e}`)
	}
        removeFromProcessList(chifra.pid);
        return false;
    });
    processList.push({pid: chifra.pid, cmd: `chifra ${routeName} ${cmd}`});
    console.log(processList);
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        removeFromProcessList(chifra.pid);
        reportAndSend(routeName, code, res);
    })
})

app.put(`/config`, (req, res) => {
    const routeName = 'config';
    console.log(req.query)
    if(req.query.set !== undefined) {
        console.log(`setting env CONFIG_SET to...\n${JSON.stringify(req.body)}`)
        env.CONFIG_SET = req.body
    }
    let cmd = generateCmd(routeName, req.query);
    let chifra = spawn("chifra", [routeName, cmd], {env: env, detached: true});
    req.on('close', (err) => {
        console.log(`killing ${-chifra.pid}...`)
	try {
            process.kill(-chifra.pid, 'SIGINT')
	} catch (e) {
	    console.log(`error killing process: ${e}`)
	}
        removeFromProcessList(chifra.pid);
        return false;
    });
    processList.push({pid: chifra.pid, cmd: `chifra ${routeName} ${cmd}`});
    console.log(processList);
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        removeFromProcessList(chifra.pid);
        reportAndSend(routeName, code, res);
    })
})

app.listen(port, () => {
    console.log('TrueBlocks Data API initialized on port ' + port);
});
