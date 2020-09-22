/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveService } from './leave.service';

describe('Service: Leave', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveService]
    });
  });

  it('should ...', inject([LeaveService], (service: LeaveService) => {
    expect(service).toBeTruthy();
  }));
});
