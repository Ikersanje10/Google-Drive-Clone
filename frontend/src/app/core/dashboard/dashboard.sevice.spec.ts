import { TestBed } from '@angular/core/testing';
import { DashboardSevice } from './dashboard.sevice';

describe('DashboardSevice', () => {
  let service: DashboardSevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardSevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
