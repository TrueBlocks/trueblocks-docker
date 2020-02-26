import WS from 'jest-websocket-mock';

import {
  addMessageListener,
  addActionListener,
  removeListener,
  send,
  clear,
  setup
} from './websocket';

let server = null;

beforeEach(async () => {
  if (server) {
    clear();
  }
  server = new WS('ws://localhost:1234/websocket');
  setup({ port: 1234 });
  await server.connected;
});

afterEach(() => WS.clean());

describe('Websocket communication module', () => {
  it('can receive messages via addMessageListener', async done => {
    const expectedMessage = {
      action: 'test',
      testing: true
    };

    addMessageListener((message) => {
      expect(message).toEqual(expectedMessage);
      done();
    });

    server.send(JSON.stringify(expectedMessage));
  });

  it('can receive messages via addActionListener', async done => {
    const expectedMessage = {
      action: 'test',
      testing: true
    };
    const otherListener = jest.fn();

    addActionListener('test', (message) => {
      expect(message).toEqual(expectedMessage);
      expect(otherListener).not.toHaveBeenCalled();
      done();
    });

    addActionListener('never-called', otherListener);

    server.send(JSON.stringify({ action: 'something-else' }));
    server.send(JSON.stringify(expectedMessage));
  });

  it('can remove listeners', () => {
    const listener = jest.fn();

    addMessageListener(listener);

    removeListener(listener);

    server.send(JSON.stringify({ action: 'test' }));
    expect(listener).not.toHaveBeenCalled();
  });

  it('sends message', async () => {
    const expectedMessage = {
      action: 'test',
      testing: true
    };

    send(expectedMessage.action, { testing: expectedMessage.testing });

    await expect(server).toReceiveMessage(JSON.stringify(expectedMessage));
    expect(server).toHaveReceivedMessages([
      JSON.stringify(expectedMessage)
    ]);
  });
});
