import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsItemComponent } from './tests-item.component';

describe('TestsItemComponent', () => {
  let component: TestsItemComponent;
  let fixture: ComponentFixture<TestsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
