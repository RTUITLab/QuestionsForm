import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ModalManagerService } from '../modal-manager.service';

@Component({
  selector: 'app-modal-overlay',
  templateUrl: './modal-overlay.component.html',
  styleUrls: ['./modal-overlay.component.styl']
})
export class ModalOverlayComponent implements OnInit {

  data: any;
  isActive = false;

  constructor(private mm: ModalManagerService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.mm.modal.subscribe((data) => {
      if(data != null) {
        this.isActive = true;
        this.data = data;
        this.cd.detectChanges();
      }
    });
  }

  btnClick(id) {
    this.isActive = false;
    console.log(this.data);
    this.data.done.next(id);
  }

}
