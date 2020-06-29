import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderOverlayComponent } from './preloader-overlay.component';

describe('PreloaderOverlayComponent', () => {
  let component: PreloaderOverlayComponent;
  let fixture: ComponentFixture<PreloaderOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloaderOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
