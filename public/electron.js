const { app, BrowserWindow } = require('electron')
const path = require("path");
const isDev = require("electron-is-dev");
const debug = require('electron-debug');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

debug();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  })

  win.loadURL(
    isDev
    ? 'https://localhost:3000'
    : `file://${path.join(__dirname, "../build/index.html")}` 
  )

  if (isDev) {
    win.webContents.openDevTools()
  }
}

if (isDev) {
  app.commandLine.appendSwitch('ignore-certificate-errors')
}

if (require("electron-squirrel-startup")) {
  app.quit()
}

app.whenReady().then(async () => {
  try {
    await installExtension(REACT_DEVELOPER_TOOLS)
  } catch (err) {
    console.log(`react developer tools extension error ${err}`)
  }

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})