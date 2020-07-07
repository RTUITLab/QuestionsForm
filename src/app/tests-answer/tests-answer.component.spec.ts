import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsAnswerComponent } from './tests-answer.component';

describe('TestsAnswerComponent', () => {
  let component: TestsAnswerComponent;
  let fixture: ComponentFixture<TestsAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
