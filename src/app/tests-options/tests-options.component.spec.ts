import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsOptionsComponent } from './tests-options.component';

describe('TestsOptionsComponent', () => {
  let component: TestsOptionsComponent;
  let fixture: ComponentFixture<TestsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
