import { TestBed } from '@angular/core/testing';

import { WindowButtonsService } from './window-buttons.service';

describe('WindowButtonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowButtonsService = TestBed.get(WindowButtonsService);
    expect(service).toBeTruthy();
  });
});
