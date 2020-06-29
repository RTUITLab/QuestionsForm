import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMenuItemComponent } from './left-menu-item.component';

describe('LeftMenuItemComponent', () => {
  let component: LeftMenuItemComponent;
  let fixture: ComponentFixture<LeftMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
