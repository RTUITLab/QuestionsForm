import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-tests-item',
  templateUrl: './tests-item.component.html',
  styleUrls: ['./tests-item.component.styl']
})
export class TestsItemComponent implements OnInit {

  @Input() category: string;
  @Input() type: string;
  @Input() id: number;

  element: any;

  constructor(private dm: DataModelService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.dm.data.subscribe((data) => {
      this.element = this.dm.getTestItem(this.id, this.category, this.type);
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });
  }

  remove() {
    this.dm.removeTestItem(this.id, this.category, this.type);
  }

  toggleType() {
    this.dm.toggleTestItemType(this.id, this.category, this.type);
  }

}
