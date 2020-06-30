import { Component, OnInit, Input, Output, ChangeDetectorRef } from "@angular/core";
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: "app-left-menu-item",
  templateUrl: "./left-menu-item.component.html",
  styleUrls: ["./left-menu-item.component.styl"]
})
export class LeftMenuItemComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() link: string;
  @Output() itemClick = new EventEmitter();

  curImg: SafeUrl;
  active: boolean;

  constructor(private router: Router, private dm: DataModelService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.active = this.router.url === ('/' + this.link);
    });
  }

  onClick() {
    this.itemClick.emit(null);
    if(this.link) {
      this.router.navigate([this.link]);
    }
  }

}
