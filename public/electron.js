// Modules to control application life and create native browser window
const {app, dialog, BrowserWindow} = require('electron');
const {autoUpdater} = require("electron-updater");
const path = require('path');
const isDev = require('electron-is-dev');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;
log.info('App starting...');

// TODO: temp proxy scripts
require('../tunnel/ws-mpos');
require('../tunnel/ws-cash');
// TODO: End temp proxy scripts


let STATUS = {
  NONE: 0,
  PROCESS: 1,
  READY: 2,
};

let notified = false;
let updateStatus = STATUS.NONE;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


function notify(...params) {
  if(!notified){
    notified = true;
    dialog.showMessageBox(...params).then(() => notified = false)
  }
}

function notifyInstall() {
  notify(mainWindow, {
    type: 'info',
    title: 'Установка обновления',
    message: 'Обновление готово. Вы подтверждаете установку?',
    buttons: ['Yes', 'No']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      updateStatus = STATUS.NONE;
      setImmediate(() => autoUpdater.quitAndInstall())
    }
  })
}


function browserLog(...data) {
  mainWindow.webContents.executeJavaScript("console.log('%cFROM MAIN', 'color: #800', '" + data + "');");
}

function sendStatusToWindow(text) {
  log.info(text);
  browserLog(text);
  mainWindow.webContents.send('message', text);
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    // show: false,
    // minimizable: false,
    // closable: false,
    // alwaysOnTop: true,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setFullScreen(true);
  mainWindow.removeMenu();

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

function startApp(){
  createWindow();
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
  notify(mainWindow, {
    type: 'info',
    title: 'Доступна новая версия',
    message: 'Найдено обновление. Хотите скачать его сейчас?',
    buttons: ['Yes', 'No']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate()
    }
  });
});
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
  // dialog.showErrorBox('Error: ', err == null ? "unknown" : (err.stack || err).toString())
});
autoUpdater.on('download-progress', (progressObj) => {
  updateStatus = STATUS.PROCESS;

  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
});
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
  updateStatus = STATUS.READY;
  notifyInstall();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startApp);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) startApp()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on('ready', function()  {
  setInterval(function () {
    if (updateStatus === STATUS.NONE){
      autoUpdater.checkForUpdatesAndNotify();
    }else if (updateStatus === STATUS.READY){
      notifyInstall()
    }
  }, 60 * 1000);
});
