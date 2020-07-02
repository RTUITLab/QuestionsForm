import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsCategoryComponent } from './tests-category.component';

describe('TestsCategoryComponent', () => {
  let component: TestsCategoryComponent;
  let fixture: ComponentFixture<TestsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
