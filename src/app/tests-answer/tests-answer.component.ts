import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-tests-answer',
  templateUrl: './tests-answer.component.html',
  styleUrls: ['./tests-answer.component.styl']
})
export class TestsAnswerComponent implements OnInit {

  @Input() category: string;
  @Input() type: string;
  @Input() testId: number;
  @Input() answerId: number;

  constructor(private dm: DataModelService, private cd: ChangeDetectorRef) { }

  answer: any

  ngOnInit() {
    this.dm.data.subscribe((data) => {
      this.answer = data.parsed.tests[this.category][this.type][this.testId].answers[this.answerId];
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

  onCheckboxChanges(e, param) {
    this.answer[param] = e.checked;
    this.dm.updateDataParsed();
  }

  remove() {
    this.dm.removeAnswer(this.category, this.type, this.testId, this.answerId);
  }

}
