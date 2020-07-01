import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { DataModelService } from '../data-model.service';
import { ModalManagerService } from '../modal-manager.service';

@Component({
  selector: 'app-pics-item',
  templateUrl: './pics-item.component.html',
  styleUrls: ['./pics-item.component.styl']
})
export class PicsItemComponent implements OnInit {

  @Input() title: string;
  @Input() src: SafeUrl;

  constructor(private dm: DataModelService, private mm: ModalManagerService) { }

  ngOnInit() {
  }

  removePic() {
    this.dm.removeImage(this.title);
  }

  previewPic() {
    this.mm.pushModal({
      preview: true,
      previewImage: this.src
    });
  }

}
