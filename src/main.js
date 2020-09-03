import { app, BrowserWindow, ipcMain } from "electron";
import sharp from "sharp";
import { existsSync } from "fs";
const path = require('path');

let mainWindow;

function bufferToUrl(buffer, options = {mime: 'image/png', encoding: 'base64'}) {
  const {mime, encoding} = options;
  return 'data:' + mime + ';' + encoding + ',' + buffer.toString(encoding);
}

ipcMain.on('thumbnail', (e, path) => {
  if (path && existsSync(path)) {
    sharp(path).resize(300).toBuffer().then(data => {
      e.reply('thumbnail-result', {dataUrl: bufferToUrl(data), path: path});
    })
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const url = `file://${path.join(__dirname, "../build/index.html")}`

  mainWindow.loadURL(url);
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});