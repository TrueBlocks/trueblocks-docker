/**
 * This script is meant to be used with Foreman or nodemon.
 * It waits until react dev server is running and then opens
 * the Electron app.
 */
const net = require('net');
const exec = require('child_process').exec;

const foremanPortOffset = 100;
const port = process.env.PORT ? (process.env.PORT - foremanPortOffset) : 3000;
const client = new net.Socket();

let watchTimeoutId = undefined;
let startedElectron = false;

const tryConnection = () => client.connect({port: port}, () => {
  client.end();

  if (startedElectron) return;

  console.log('starting Electron');
  exec('yarn electron-dev');
  startedElectron = true;
  clearTimeout(watchTimeoutId);
});

client.on('error', (error) => {
  watchTimeoutId = setTimeout(tryConnection, 1000);
});

tryConnection();
