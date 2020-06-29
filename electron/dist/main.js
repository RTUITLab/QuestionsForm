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
var win;
electron_1.app.on('ready', function () { return __awaiter(_this, void 0, void 0, function () {
    var protocolName;
    return __generator(this, function (_a) {
        createWindow();
        protocolName = 'sfp';
        electron_1.protocol.registerFileProtocol(protocolName, function (request, callback) {
            var url = request.url.replace(protocolName + "://", '');
            try {
                return callback(decodeURIComponent(url));
            }
            catch (error) {
                // Handle the error as needed
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
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
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
    if (arg == "single") {
        var files = electron_1.dialog.showOpenDialog({
            title: 'Открытие теста в формате JSON-файла',
            filters: [
                { name: 'JSON-файлы', extensions: ['json'] },
                { name: 'Все файлы', extensions: ['*'] }
            ],
            properties: ['openFile']
        });
        files.then(function (val) {
            win.webContents.send('openDialogResponse', val.filePaths[0]);
        });
    }
    else {
    }
});
electron_1.ipcMain.on('getJSONFile', function (event, arg) {
    fs.readFile(arg, 'utf8', function (error, data) {
        win.webContents.send('getJSONFileResponse', data);
    });
});
//# sourceMappingURL=main.js.map