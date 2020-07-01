import { Component, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from './data-model.service';
import { WindowButtonsService } from './window-buttons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  title = 'TestEditor';
  isMaximized = false;
  status: any;
  wbRef: any;

  constructor(private dm: DataModelService, private wb: WindowButtonsService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.wbRef = this.wb;
    this.dm.status.subscribe((status) => {
      this.status = status;
      this.cd.detectChanges();
    });

    this.wb.init();
    this.wb.isMaximized.subscribe((val) => {
      this.isMaximized = val;
      this.cd.detectChanges();
    });
  }
}
