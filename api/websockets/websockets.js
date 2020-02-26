/*
 * NOTE: Firefox seems to have problems upgrading connection,
 * the headers sent by it simply do not trigger Node's `upgrade`
 * event
*/
const ws = require('ws');

let server = null;
const listeners = [];

function log(...args) {
  console.log.apply(null, [ 'WebSockets:', ...args ]);
}

function reportConnectedCount() {
  log('sockets connected', server.clients.size);
}

function bindSocketEvents(socket) {
  socket.on('close', (code, reason) => {
    log('socket closing', code, reason);

    reportConnectedCount();
  });
  socket.on('message', (message) => {
    log('incoming message:', message);
    listeners.forEach(listener => listener(message, socket));
  });
  socket.on('error', (error) => {
    console.error('Websockets error:', error);
  });
}

function bindServerEvents(server) {
  server.on('listening', () => log('server ready'));
  server.on('connection', socket => {
    log('socket connected');
    reportConnectedCount();

    bindSocketEvents(socket);
  });
}

module.exports = {
  /**
   * Creates a server (singleton)
   * @param {object} httpInstance - node server instance (can be the result of express.listen)
   **/
  createServer(httpInstance) {
    server = new ws.Server({
      server: httpInstance,
      clientTracking: true,
      path: '/websocket'
    });
    bindServerEvents(server);

    return server;
  },

  /**
   * Sends a message to all opened sockets. Converts message to JSON, unless
   * `sendRaw` is set to true
   * @param message - the message to send
   * @param {boolean} sendRaw - if set to true, the message will not be converted to JSON
   **/
  broadcast(message, sendRaw=false) {
    const messageToSend = sendRaw ? message : JSON.stringify(message);

    log('broadcasting message:', messageToSend);
    [...server.clients]
      .filter(({ readyState }) => readyState === ws.OPEN)
      .forEach(socket => socket.send(messageToSend));
  },

  /**
   * Registers a new listener to call when a message arrives from a client
   **/
  addMessageListener(listener) {
    listeners.push(listener);
  }
};
