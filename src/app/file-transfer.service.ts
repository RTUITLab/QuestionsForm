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
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }
}
