const { app, BrowserWindow } = require('electron');
const developmentMode = require('electron-is-dev');

const path = require('path');
const url = require('url');

const getUiUrl = require('./get_ui_url').getUiUrl;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(getUiUrl(developmentMode));

  if (developmentMode) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform === 'darwin') return;

  app.quit();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length) return;

  createWindow();
});
