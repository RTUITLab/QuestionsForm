import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from '../data-model.service';
import { FileTransferService } from '../file-transfer.service';

@Component({
  selector: 'app-pics-page',
  templateUrl: './pics-page.component.html',
  styleUrls: ['./pics-page.component.styl']
})
export class PicsPageComponent implements OnInit {

  constructor(private dm: DataModelService, private ft: FileTransferService, private cd: ChangeDetectorRef) { }

  images = [];

  ngOnInit() {
    this.dm.images.subscribe((images) => {
      this.images = images.images;
      console.log(images);
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });
  }

  getPic(path) {
    return this.ft.sanitizeURL(this.dm.tempFolder.value + '\\' + path);
  }

  addPic() {
    this.dm.addImage();
  }

  removeAllPics() {
    this.dm.removeAllImages();
  }

}
