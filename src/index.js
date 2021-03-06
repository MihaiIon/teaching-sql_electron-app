"use strict";
const electron = require("electron");
const path = require("path");

const app = electron.app;

// Adds debug features like hotkeys for triggering dev tools and reload
require("electron-debug")();

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
  // Dereference the window
  // For multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 1024,
    height: 800
  });

  win.loadURL(`file://${path.resolve(__dirname, "./app/index.html")}`);
  win.on("closed", onClosed);

  return win;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on("ready", () => {
  mainWindow = createMainWindow();
});
