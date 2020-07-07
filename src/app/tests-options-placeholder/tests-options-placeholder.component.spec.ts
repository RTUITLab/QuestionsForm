import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsOptionsPlaceholderComponent } from './tests-options-placeholder.component';

describe('TestsOptionsPlaceholderComponent', () => {
  let component: TestsOptionsPlaceholderComponent;
  let fixture: ComponentFixture<TestsOptionsPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsOptionsPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsOptionsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
