import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-tests-item',
  templateUrl: './tests-item.component.html',
  styleUrls: ['./tests-item.component.styl']
})
export class TestsItemComponent implements OnInit {

  @Input() category: string;
  @Input() type: string;
  @Input() itemId: number;

  element: any;
  isOpened = false;

  constructor(private dm: DataModelService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.dm.data.subscribe((data) => {
      this.element = this.dm.getTestItem(this.itemId, this.category, this.type);
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });
    this.dm.openedTest.subscribe((openedTest) => {
      this.isOpened = openedTest.category == this.category && openedTest.type == this.type && openedTest.id == this.itemId;
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });
  }

  remove() {
    this.dm.removeTestItem(this.itemId, this.category, this.type, this.isOpened);
  }

  toggleType() {
    this.dm.toggleTestItemType(this.itemId, this.category, this.type, this.isOpened);
  }

  open() {
    this.dm.openTest(this.category, this.type, this.itemId);
  }

}
