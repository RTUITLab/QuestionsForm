import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-tests-page',
  templateUrl: './tests-page.component.html',
  styleUrls: ['./tests-page.component.styl']
})
export class TestsPageComponent implements OnInit {

  constructor(private dm: DataModelService, private cd: ChangeDetectorRef) { }

  openedTest: any;

  ngOnInit() {
    this.openedTest = this.dm.openedTest.getValue();
    this.dm.openedTest.subscribe((openedTest) => {
      this.openedTest = openedTest;
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });
  }
}
