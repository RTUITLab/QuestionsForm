import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawJsonPageComponent } from './raw-json-page.component';

describe('RawJsonPageComponent', () => {
  let component: RawJsonPageComponent;
  let fixture: ComponentFixture<RawJsonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawJsonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawJsonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
