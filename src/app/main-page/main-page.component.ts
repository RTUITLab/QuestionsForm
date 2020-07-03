import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.styl']
})
export class MainPageComponent implements OnInit {

  constructor(private dm: DataModelService, private cd: ChangeDetectorRef) { }

  data: any;

  ngOnInit() {
    this.dm.data.subscribe((data) => {
      this.data = data.parsed;
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });
  }

  onChanges(event, val = null, reg = null) {
    if(!reg) {
      this.dm.updateDataParsed(this.data);
    }else {
      const regexp = new RegExp(reg);
      if(val.match(regexp) != null) {
        this.dm.updateDataParsed(this.data);
      }
    }
  }

  onCheckboxChanges(e, param) {
    this.data[param] = e.checked;
    console.log(this.data[param]);
    this.dm.updateDataParsed(this.data);
  }
}
