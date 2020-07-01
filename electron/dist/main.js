"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require("fs");
var util = require("util");
var rimraf = require("rimraf");
var unzip = require("unzipper");
var win;
var tempFolder = __dirname + '\\temp';
var awUnlink = util.promisify(fs.unlink);
var awExists = util.promisify(fs.exists);
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[index], index, array)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
electron_1.app.on('ready', function () { return __awaiter(_this, void 0, void 0, function () {
    var protocolName;
    return __generator(this, function (_a) {
        rimraf.sync(tempFolder);
        fs.mkdirSync(tempFolder);
        createWindow();
        protocolName = 'sfp';
        electron_1.protocol.registerFileProtocol(protocolName, function (request, callback) {
            var url = request.url.replace(protocolName + "://", '');
            try {
                return callback(decodeURIComponent(url));
            }
            catch (error) {
                console.error(error);
            }
        });
        return [2 /*return*/];
    });
}); });
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
electron_1.app.on('window-all-closed', function () {
    rimraf.sync(tempFolder);
    electron_1.app.quit();
});
function createWindow() {
    win = new electron_1.BrowserWindow({
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
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/TestEditor/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
    win.on('maximize', function () {
        win.webContents.send('windowStatusChanged', true);
    });
    win.on('unmaximize', function () {
        win.webContents.send('windowStatusChanged', false);
    });
}
electron_1.ipcMain.on('windowClose', function (event, arg) {
    win.close();
});
electron_1.ipcMain.on('windowMinimize', function (event, arg) {
    win.minimize();
});
electron_1.ipcMain.on('windowMaximize', function (event, arg) {
    win.maximize();
});
electron_1.ipcMain.on('windowUnmaximize', function (event, arg) {
    win.unmaximize();
});
electron_1.ipcMain.on('openDialog', function (event, arg) {
    if (arg == 'single') {
        var files = electron_1.dialog.showOpenDialog({
            title: 'Открытие теста в формате JSON-файла',
            filters: [
                { name: 'JSON-файлы', extensions: ['json'] },
                { name: 'Все файлы', extensions: ['*'] }
            ],
            properties: ['openFile']
        });
        files.then(function (val) {
            if (val != undefined) {
                win.webContents.send('openDialogResponse', val.filePaths[0]);
            }
            else {
                win.webContents.send('openDialogResponse', undefined);
            }
        });
    }
    else if (arg == 'zip') {
        var files = electron_1.dialog.showOpenDialog({
            title: 'Открытие теста в формате ZIP-архива',
            filters: [
                { name: 'ZIP-архивы', extensions: ['zip'] },
                { name: 'Все файлы', extensions: ['*'] }
            ],
            properties: ['openFile']
        });
        files.then(function (val) {
            win.webContents.send('openDialogResponse', val.filePaths[0]);
        });
    }
    else if (arg == 'image') {
        var files = electron_1.dialog.showOpenDialog({
            title: 'Добавить изображение',
            filters: [
                { name: 'Изображения', extensions: ['jpg', 'jpeg', 'png', 'gif'] },
                { name: 'Все файлы', extensions: ['*'] }
            ],
            properties: ['openFile']
        });
        files.then(function (val) {
            win.webContents.send('openDialogResponse', val.filePaths[0]);
        });
    }
});
electron_1.ipcMain.on('getJSONFile', function (event, arg) {
    fs.readFile(tempFolder + arg, 'utf8', function (error, data) {
        win.webContents.send('getJSONFileResponse', data);
    });
});
electron_1.ipcMain.on('getTempAddr', function (event, arg) {
    win.webContents.send('getTempAddrResponse', tempFolder);
});
electron_1.ipcMain.on('getImageList', function (event, arg) {
    var res = [];
    fs.readdir(tempFolder, function (err, items) {
        items.forEach(function (e) {
            if (path.extname(e) !== '.json') {
                res.push(e);
            }
        });
        win.webContents.send('getImageListResponse', res);
    });
});
electron_1.ipcMain.on('removeImagesFromTemp', function (event, arg) {
    var res = [];
    fs.readdir(tempFolder, function (err, items) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, asyncForEach(items, function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(path.extname(e) !== '.json')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, awUnlink(tempFolder + '\\' + e)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, Promise.resolve()];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    win.webContents.send('removeImagesFromTempResponse');
                    return [2 /*return*/];
            }
        });
    }); });
});
electron_1.ipcMain.on('eraseTemp', function (event, arg) {
    rimraf(tempFolder, function () {
        fs.mkdir(tempFolder, function () {
            win.webContents.send('eraseTempResponse', tempFolder);
        });
    });
});
electron_1.ipcMain.on('copySingleFileToTemp', function (event, arg) {
    var input = fs.createReadStream(arg);
    var output = fs.createWriteStream(tempFolder + '\\' + path.basename(arg));
    input.pipe(output).once('finish', function () {
        win.webContents.send('copySingleFileToTempResponse', '\\' + path.basename(arg));
    });
});
electron_1.ipcMain.on('copySingleFileToTempSafely', function (event, arg) {
    var ensureUniqueFilename = new Promise(function (resolve, reject) {
        var currentPath = path.basename(arg);
        awExists(tempFolder + '\\' + currentPath).then(function (exists) { return __awaiter(_this, void 0, void 0, function () {
            var num, _loop_1, state_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!exists) return [3 /*break*/, 1];
                        resolve(currentPath);
                        return [3 /*break*/, 4];
                    case 1:
                        num = 0;
                        _loop_1 = function () {
                            var newPath, breakFlag;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        num++;
                                        newPath = currentPath.split('.')[0] + (" (" + num + ").") + currentPath.split('.')[1];
                                        console.log(newPath);
                                        breakFlag = false;
                                        return [4 /*yield*/, awExists(tempFolder + '\\' + newPath).then(function (exists) {
                                                console.log(exists);
                                                if (!exists) {
                                                    breakFlag = true;
                                                    resolve(newPath);
                                                }
                                            })];
                                    case 1:
                                        _a.sent();
                                        if (breakFlag) {
                                            return [2 /*return*/, "break"];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1()];
                    case 3:
                        state_1 = _a.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 4];
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    ensureUniqueFilename.then(function (path) {
        var input = fs.createReadStream(arg);
        var output = fs.createWriteStream(tempFolder + '\\' + path);
        input.pipe(output).once('finish', function () {
            win.webContents.send('copySingleFileToTempSafelyResponse', '\\' + path);
        });
    });
});
electron_1.ipcMain.on('copyZipFileToTemp', function (event, arg) {
    var input = fs.createReadStream(arg);
    var unzipper = unzip.Extract({ path: tempFolder });
    input.pipe(unzipper).once('close', function () {
        win.webContents.send('copyZipFileToTempResponse', tempFolder);
    });
});
electron_1.ipcMain.on('copyTempToZipFile', function (event, arg) {
    var input = fs.createReadStream(arg);
    var unzipper = unzip.Extract({ path: tempFolder });
    input.pipe(unzipper).once('close', function () {
        win.webContents.send('copyTempToZipFileResponse', tempFolder);
    });
});
electron_1.ipcMain.on('removeFileFromTemp', function (event, arg) {
    fs.unlink(tempFolder + '\\' + arg, function () {
        win.webContents.send('removeFileFromTempResponse');
    });
});
electron_1.ipcMain.on('checkIfExistsInTemp', function (event, arg) {
    fs.exists(tempFolder + '\\' + arg, function (exists) {
        console.log(tempFolder + '\\' + arg);
        win.webContents.send('checkIfExistsInTempResponse', exists);
    });
});
//# sourceMappingURL=main.js.map