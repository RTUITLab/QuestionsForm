import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicsPageComponent } from './pics-page.component';

describe('PicsPageComponent', () => {
  let component: PicsPageComponent;
  let fixture: ComponentFixture<PicsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
