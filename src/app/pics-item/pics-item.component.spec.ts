import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicsItemComponent } from './pics-item.component';

describe('PicsItemComponent', () => {
  let component: PicsItemComponent;
  let fixture: ComponentFixture<PicsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
