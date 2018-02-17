import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'

const env: string = process.env.NODE_ENV || 'production'
const __DEV__: boolean = env === 'development'

let mainWindow: BrowserWindow

function createWindow (): void {
    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    if (__DEV__) {
        mainWindow.loadURL('http://localhost:4444')
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(app.getAppPath(), 'dist', 'renderer', 'index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    mainWindow.on('closed', (): void => {
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});