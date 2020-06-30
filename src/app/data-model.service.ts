import { Injectable, ChangeDetectorRef } from '@angular/core';
import { FileTransferService } from './file-transfer.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const protoStatus = {
  loading: false,
  fileLoaded: false,
  lastOpeningMode: '',
  filePath: ''
};

const protoData = {
  raw: '',
  parsed: {}
}


@Injectable({
  providedIn: 'root'
})

export class DataModelService {

  public status: BehaviorSubject<any> = new BehaviorSubject<any>(protoStatus);
  public data: BehaviorSubject<any> = new BehaviorSubject<any>(protoData);

  constructor(private ft: FileTransferService, private router: Router) { }

  loadSingleJSON() {

    const newStatus = Object.create(protoStatus);
    newStatus.loading = true;
    this.status.next(newStatus);

    this.ft.eraseTemp().then(() => {
      this.ft.openDialog('single').then((path) => {
        if(path === undefined) {
          this.status.next(Object.create(protoStatus));
          return;
        }
        this.ft.copySingleFileToTemp(path).then((path) => {
          this.ft.getJSONFile(path).then((data) => {
            this.router.navigate(['raw-json']);
            this.data.next({raw: data, parsed: JSON.parse(data)});
            const newStatus = Object.create(protoStatus);
            newStatus.fileLoaded = true;
            newStatus.filePath = path;
            newStatus.loading = false;
            newStatus.lastOpeningMode = 'single';
            this.status.next(newStatus);
          });
        });
      });
    });
  }

  loadZip() {

    const newStatus = Object.create(protoStatus);
    newStatus.loading = true;
    this.status.next(newStatus);

    this.ft.eraseTemp().then(() => {
      this.ft.openDialog('zip').then((path) => {
        if(path === undefined) {
          this.status.next(Object.create(protoStatus));
          return;
        }
        this.ft.copyZipFileToTemp(path).then(() => {
          this.ft.getJSONFile('\\index.json').then((data) => {
            this.router.navigate(['raw-json']);
            this.data.next({raw: data, parsed: JSON.parse(data)});
            const newStatus = Object.create(protoStatus);
            newStatus.fileLoaded = true;
            newStatus.filePath = path;
            newStatus.loading = false;
            newStatus.lastOpeningMode = 'single';
            this.status.next(newStatus);
          });
        });
      });
    });
  }

  close() {
    this.ft.eraseTemp().then(() => {
      this.router.navigate(['']);
      this.status.next(protoStatus);
      this.data.next(protoData);
    });
  }
}
