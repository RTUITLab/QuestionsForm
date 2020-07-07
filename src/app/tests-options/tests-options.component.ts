import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-tests-options',
  templateUrl: './tests-options.component.html',
  styleUrls: ['./tests-options.component.styl']
})
export class TestsOptionsComponent implements OnInit {

  constructor(private dm: DataModelService, private cd: ChangeDetectorRef) { }

  test: any
  openedTest:any;

  ngOnInit() {
    this.openedTest = this.dm.openedTest.getValue();
    this.test = this.dm.data.getValue().parsed.tests[this.openedTest.category][this.openedTest.type][this.openedTest.id];
    this.dm.openedTest.subscribe((openedTest) => {
      this.openedTest = openedTest;
      this.test = this.dm.data.getValue().parsed.tests[this.openedTest.category][this.openedTest.type][this.openedTest.id];
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });
    this.dm.data.subscribe((data) => {
      this.openedTest = this.dm.openedTest.getValue();
      this.test = data.parsed.tests[this.openedTest.category][this.openedTest.type][this.openedTest.id];
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });

  }

  onChanges(event, val = null, reg = null) {
    if(!reg) {
      this.dm.updateDataParsed();
    }else {
      const regexp = new RegExp(reg);
      if(val.match(regexp) != null) {
        this.dm.updateDataParsed();
      }
    }
  }

  removeAll() {
    this.dm.removeAllAnswers(this.openedTest.category, this.openedTest.type, this.openedTest.id);
  }

  add() {
    this.dm.addAnswer(this.openedTest.category, this.openedTest.type, this.openedTest.id);
  }

}
