import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-tests-category',
  templateUrl: './tests-category.component.html',
  styleUrls: ['./tests-category.component.styl']
})
export class TestsCategoryComponent implements OnInit {

  @Input() category: string;

  constructor(private dm: DataModelService, private cd: ChangeDetectorRef) { }

  categoryData: any;
  isOpened = false;

  ngOnInit() {
    this.dm.data.subscribe((data) => {
      this.categoryData = this.dm.getTestCategory(this.category);
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  addItem() {
    this.dm.addTestItem(this.category, 'A');
  }

  clear() {
    this.dm.removeTestItemsOfCategory(this.category);
  }
}
