import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-tests-selector',
  templateUrl: './tests-selector.component.html',
  styleUrls: ['./tests-selector.component.styl']
})
export class TestsSelectorComponent implements OnInit {

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


}
