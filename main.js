const { app, BrowserWindow, globalShortcut } = require('electron')

const { url } = require('./config')

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(url)
  win.setBackgroundColor('#333333')
}

function toggleDevTools() {
  win.webContents.toggleDevTools()
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+j', toggleDevTools)
}

app.whenReady()
  .then(createWindow)
  .then(createShortcuts)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})