import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from '../data-model.service';



@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.styl']
})
export class LeftMenuComponent implements OnInit {

  status: any;

  constructor(private dm: DataModelService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.status = this.dm.status;
    this.dm.status.subscribe((status) => {
      this.status = status;
      this.cd.detectChanges();
      console.log(this.status);
      console.log(status);
    });
  }

}
