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

  async getImageFile(path: string) {
    return new Promise<SafeUrl>((resolve, reject) => {
      electron.ipcRenderer.once('getImageFileResponse', (event, arg) => {
        resolve(this.sanitizer.bypassSecurityTrustUrl(path));
      });
      electron.ipcRenderer.send('getImageFile', path);
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
}
