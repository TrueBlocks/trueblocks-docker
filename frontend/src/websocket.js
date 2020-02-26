let {
  socket,
  socketReady,
  listeners,
  messageQueue
} = getInitialState();

function getInitialState() {
  return {
    socket: null,
    socketReady: false,
    listeners: [],
    messageQueue: []
  };
}

function callListeners(message) {
  listeners.forEach(listener => listener(message));
}

export function addMessageListener(listener) {
  listeners.push(listener);
}

export function addActionListener(actionToListenFor, listener) {
  const actionListener = (message) => {
    const { action } = message;

    if (!action) {
      throw new Error('Unsupported message format, missing action');
    }

    if (action !== actionToListenFor) return;

    listener(message);
  };

  listeners.push(actionListener);

  return actionListener;
}

export function removeListener(listenerToRemove) {
  listeners = listeners.filter(listener => listener !== listenerToRemove);
}

export function send(action, message) {
  if (!socketReady) {
    messageQueue.push([ action, message ]);
    return false;
  }

  const messageObject = {
    action,
    ...message
  };

  socket.send(JSON.stringify(messageObject));
  return true;
}

export function clear() {
  const state = getInitialState();

  socket.close();

  socket = state.socket;
  socketReady = state.socketReady;
  listeners = state.listeners;
  messageQueue = state.messageQueue;
}

export function setup({ port = 8080, path = 'websocket' } = {}) {
  socket = new WebSocket(`ws://localhost:${port}/${path}`);
  socket.addEventListener('open', () => {
    socketReady = true;
    messageQueue.forEach(message => send.apply(null, message));
    messageQueue = [];
  });
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);

    callListeners(message);
  });
}
