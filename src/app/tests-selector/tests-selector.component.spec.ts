import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsSelectorComponent } from './tests-selector.component';

describe('TestsSelectorComponent', () => {
  let component: TestsSelectorComponent;
  let fixture: ComponentFixture<TestsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
