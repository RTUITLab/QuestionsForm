import { app, BrowserWindow, ipcMain, dialog, protocol } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow;

app.on('ready', async () => {
  createWindow();
  const protocolName = 'sfp'

  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '')
    try {
      return callback(decodeURIComponent(url))
    }
    catch (error) {
      // Handle the error as needed
      console.error(error)
    }
  })

});



app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/TestEditor/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  win.on('maximize', () => {
    win.webContents.send('windowStatusChanged', true);
  });
  win.on('unmaximize', () => {
    win.webContents.send('windowStatusChanged', false);
  });
}

ipcMain.on('windowClose', (event, arg) => {
  win.close();
});

ipcMain.on('windowMinimize', (event, arg) => {
  win.minimize();
});

ipcMain.on('windowMaximize', (event, arg) => {
  win.maximize();
});

ipcMain.on('windowUnmaximize', (event, arg) => {
  win.unmaximize();
});


ipcMain.on('openDialog', (event, arg) => {
  if(arg == "single") {
    const files = dialog.showOpenDialog({
      title: 'Открытие теста в формате JSON-файла',
      filters: [
        { name: 'JSON-файлы', extensions: ['json'] },
        { name: 'Все файлы', extensions: ['*'] }
      ],
      properties: ['openFile']
    });
    files.then((val) => {
      win.webContents.send('openDialogResponse', val.filePaths[0]);
    });
  } else {

  }

});

ipcMain.on('getJSONFile', (event, arg) => {
  fs.readFile(arg, 'utf8', (error, data) => {
    win.webContents.send('getJSONFileResponse', data);
  });
});
