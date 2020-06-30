import { app, BrowserWindow, ipcMain, dialog, protocol } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import * as archiver from 'archiver';
import * as rimraf from 'rimraf';
import * as unzip from 'unzipper';

let win: BrowserWindow;

const tempFolder = __dirname + '\\temp';

app.on('ready', async () => {
  rimraf.sync(tempFolder);
  fs.mkdirSync(tempFolder);
  createWindow();
  const protocolName = 'sfp';

  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '');
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      console.error(error);
    }
  });

});



app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  rimraf.sync(tempFolder);
  app.quit();
});

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    backgroundColor: '#262c35',
    darkTheme: true,
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

  //win.webContents.openDevTools();

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
  if (arg == 'single') {
    const files = dialog.showOpenDialog({
      title: 'Открытие теста в формате JSON-файла',
      filters: [
        { name: 'JSON-файлы', extensions: ['json'] },
        { name: 'Все файлы', extensions: ['*'] }
      ],
      properties: ['openFile']
    });
    files.then((val) => {
      if(val != undefined) {
        win.webContents.send('openDialogResponse', val.filePaths[0]);
      } else {
        win.webContents.send('openDialogResponse', undefined);
      }
    });
  } else {
    const files = dialog.showOpenDialog({
      title: 'Открытие теста в формате ZIP-архива',
      filters: [
        { name: 'ZIP-архивы', extensions: ['zip'] },
        { name: 'Все файлы', extensions: ['*'] }
      ],
      properties: ['openFile']
    });
    files.then((val) => {
      win.webContents.send('openDialogResponse', val.filePaths[0]);
    });
  }

});

ipcMain.on('getJSONFile', (event, arg) => {
  fs.readFile(tempFolder + arg, 'utf8', (error, data) => {
    win.webContents.send('getJSONFileResponse', data);
  });
});

ipcMain.on('getImageFile', (event, arg) => {
    win.webContents.send('getJSONFileResponse', tempFolder + arg);
});

ipcMain.on('eraseTemp', (event, arg) => {
  rimraf(tempFolder,  () => {
    fs.mkdir(tempFolder, () => {
      win.webContents.send('eraseTempResponse', tempFolder);
    });
   });
});


ipcMain.on('copySingleFileToTemp', (event, arg) => {
   const input = fs.createReadStream(arg);
   const output = fs.createWriteStream(tempFolder + '\\' + path.basename(arg));
   input.pipe(output).once('finish', () => {
     win.webContents.send('copySingleFileToTempResponse', '\\' + path.basename(arg));
   });
 });

ipcMain.on('copyZipFileToTemp', (event, arg) => {

  const input = fs.createReadStream(arg);
  const unzipper = unzip.Extract({ path: tempFolder });
  input.pipe(unzipper).once('close', () => {

    win.webContents.send('copyZipFileToTempResponse', tempFolder);
  });
});

ipcMain.on('copyTempToZipFile', (event, arg) => {

  const input = fs.createReadStream(arg);
  const unzipper = unzip.Extract({ path: tempFolder });
  input.pipe(unzipper).once('close', () => {

    win.webContents.send('copyTempToZipFileResponse', tempFolder);
  });
});

