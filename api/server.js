const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const app = express();
const port = !isNaN(process.argv[2]) ? process.argv[2] : 8080;
const apiOptions = require('./apiOptions.generated.json');
let env = process.env;
env.API_MODE = true;
env.NO_COLOR = true;
//env.TEST_MODE = true;
//console.log("Running in test mode");
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/help', express.static(__dirname + '/help'));
app.use('/docs', express.static(__dirname + '/docs'));
app.use('/', express.static(__dirname + '/build'));

var debug = false;
//app.get('/', (req, res) => {
//  return res.redirect('/docs');
//});

let processList = [];
let cnt = 0;

const reportAndSend = (routeName, code, res) => {
  console.log(
    ~~(Date.now() / 1000) +
      ' ~ \x1b[32m\x1b[1m<INFO>\x1b[0m  : ' +
      `Exiting route \'${routeName}\' with ${code === undefined ? 'OK' : code}`
  );
  console.log(`------------- ${++cnt} ---------------------------`);
  return res.send();
};

const generateCmd = (routeName, queryObj) => {
  let cmd = Object.entries(queryObj)
    .map(([key, val]) => {
      let option = apiOptions[routeName][key];
      let cmdString = [];
      if (option === undefined) {
        console.log('\x1b[31m', 'apiOption[' + routeName + '][' + key + '] not found', '\x1b[0m');
        cmdString.push(`--${key}`, val);
      } else if (option.option_kind === 'positional') {
        cmdString.push(val);
      } else if (option.option_kind === 'switch') {
        cmdString.push(`--${key}`);
      } else {
        cmdString.push(`--${key}`, val);
      }
      return cmdString;
    })
    .reduce((acc, val) => acc.concat(val), [])
    .join(' ');
  console.log(
    ~~(Date.now() / 1000) + ' ~ \x1b[32m\x1b[1m<INFO>\x1b[0m  : ' + `API calling \'chifra ${routeName} ${cmd}\'`
  );
  return cmd;
};

const removeFromProcessList = (pid) => {
  processList = processList.filter((process) => process.pid !== pid);
};

app.get(`/ps`, (req, res) => {
  // if(req.query.kill !== undefined) {
  //     console.log("killing ", req.query.kill)
  // }
  res.send(processList);
});

app.get(`/log-message`, (req, res) => {
  console.log(JSON.stringify(req.query));
  res.send('');
});

app.get(`/ping`, (req, res) => {
  res.send(JSON.stringify(req.query));
});

app.get(`/:routeName`, (req, res) => {
  let routeName = req.params.routeName;
  if (apiOptions[routeName] === undefined) {
    var msg = '{ "errors": [ "JS API: Route ';
    msg += routeName;
    msg += ' is not available." ] }';
    console.log(msg);
    return res.send(msg);
  }
  let cmd = generateCmd(routeName, req.query);
  let chifra = spawn('chifra', [routeName, cmd], { env: env, detached: true });
  req.on('close', (err) => {
    if (debug) console.log(`killing ${-chifra.pid}...`);
    try {
      process.kill(-chifra.pid, 'SIGINT');
    } catch (e) {
      if (debug) console.log(`error killing process: ${e}`);
    }
    removeFromProcessList(chifra.pid);
    return false;
  });
  processList.push({ pid: chifra.pid, cmd: `chifra ${routeName} ${cmd}` });
  if (debug) console.log(processList);
  chifra.stderr.pipe(process.stderr);
  chifra.stdout.pipe(res).on('finish', (code) => {
    removeFromProcessList(chifra.pid);
    reportAndSend(routeName, code, res);
  });
});

app.put(`/settings`, (req, res) => {
  const routeName = 'settings';
  if (debug) console.log(req.query);
  if (req.query.set !== undefined) {
    if (debug) console.log(`setting env CONFIG_SET to...\n${JSON.stringify(req.body)}`);
    env.CONFIG_SET = JSON.stringify(req.body);
  }
  let cmd = generateCmd(routeName, req.query);
  let chifra = spawn('chifra', [routeName, cmd], { env: env, detached: true });
  req.on('close', (err) => {
    //        if (debug)
    //            console.log(`killing ${-chifra.pid}...`)
    try {
      process.kill(-chifra.pid, 'SIGINT');
    } catch (e) {
      //            if (debug)
      //                console.log("completed"); //`error killing process: ${e}`)
    }
    removeFromProcessList(chifra.pid);
    return false;
  });
  processList.push({ pid: chifra.pid, cmd: `chifra ${routeName} ${cmd}` });
  //    if (debug)
  //        console.log(processList);
  chifra.stderr.pipe(process.stderr);
  chifra.stdout.pipe(res).on('finish', (code) => {
    removeFromProcessList(chifra.pid);
    reportAndSend(routeName, code, res);
  });
});

app.listen(port, () => {
  console.log('TrueBlocks Data API (version 0.6.7) initialized on port ' + port);
});
