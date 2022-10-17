import { TestBed } from '@angular/core/testing';

import { ServicesService } from './services.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServicesService', () => {
  let service: ServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
