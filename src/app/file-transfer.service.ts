import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
const electron = (<any>window).require('electron');



@Injectable({
  providedIn: 'root'
})
export class FileTransferService {

  constructor(private sanitizer: DomSanitizer) {}

  async openDialog(mode: string) {

    return new Promise<string>((resolve, reject) => {
      electron.ipcRenderer.once('openDialogResponse', (event, arg) => {
        resolve(arg);
      });
      electron.ipcRenderer.send('openDialog', mode);
    });
  }

  async getJSONFile(path: string) {

    return new Promise<string>((resolve, reject) => {
      electron.ipcRenderer.once('getJSONFileResponse', (event, arg) => {
        resolve(arg);
      });
      electron.ipcRenderer.send('getJSONFile', path);
    });
  }

  async getTempAddr() {
    return new Promise<string>((resolve, reject) => {
      electron.ipcRenderer.once('getTempAddrResponse', (event, arg) => {
        resolve(arg);
      });
      electron.ipcRenderer.send('getTempAddr');
    });
  }

  sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async getImageList() {
    return new Promise<any>((resolve, reject) => {
      electron.ipcRenderer.once('getImageListResponse', (event, arg) => {
        resolve(arg);
      });
      electron.ipcRenderer.send('getImageList');
    });
  }

  async copySingleFileToTemp(path: string) {

    return new Promise<string>((resolve, reject) => {
      electron.ipcRenderer.once('copySingleFileToTempResponse', (event, arg) => {
        resolve(arg);
      });
      electron.ipcRenderer.send('copySingleFileToTemp', path);
    });
  }

  async copySingleFileToTempSafely(path: string) {

    return new Promise<string>((resolve, reject) => {
      electron.ipcRenderer.once('copySingleFileToTempSafelyResponse', (event, arg) => {
        resolve(arg);
      });
      electron.ipcRenderer.send('copySingleFileToTempSafely', path);
    });
  }

  async copyZipFileToTemp(path: string) {
    return new Promise<string>((resolve, reject) => {
      electron.ipcRenderer.once('copyZipFileToTempResponse', (event, arg) => {
        resolve(arg);
      });
      electron.ipcRenderer.send('copyZipFileToTemp', path);
    });
  }

  async eraseTemp() {
    return new Promise<any>((resolve, reject) => {
      electron.ipcRenderer.once('eraseTempResponse', (event, arg) => {
        resolve();
      });
      electron.ipcRenderer.send('eraseTemp');
    });
  }

  async removeFileFromTemp(path) {
    return new Promise<any>((resolve, reject) => {
      electron.ipcRenderer.once('removeFileFromTempResponse', (event, arg) => {
        resolve();
      });
      electron.ipcRenderer.send('removeFileFromTemp', path);
    });
  }

  async removeImagesFromTemp() {
    return new Promise<any>((resolve, reject) => {
      electron.ipcRenderer.once('removeImagesFromTempResponse', (event, arg) => {
        resolve();
      });
      electron.ipcRenderer.send('removeImagesFromTemp');
    });
  }

  async checkIfExistsInTemp(path) {
    return new Promise<any>((resolve, reject) => {
      electron.ipcRenderer.once('checkIfExistsInTempResponse', (event, arg) => {
        resolve(arg);
      });
      electron.ipcRenderer.send('checkIfExistsInTemp', path);
    });
  }
}
