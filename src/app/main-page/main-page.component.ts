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

  onChanges(newVal) {
    this.dm.data.next({raw: JSON.stringify(this.data, null, 2), parsed: this.data});
  }

  log(s) {
    console.log(s);
  }
}
