import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-raw-json-page',
  templateUrl: './raw-json-page.component.html',
  styleUrls: ['./raw-json-page.component.styl']
})
export class RawJsonPageComponent implements OnInit {

  constructor(private dm: DataModelService) { }

  loaded: string;

  rawData: string;

  ngOnInit() {
    this.dm.data.subscribe((data) => {
      this.rawData = data.raw;
    });
  }

}
