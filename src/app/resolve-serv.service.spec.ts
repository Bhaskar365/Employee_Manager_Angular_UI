import { TestBed } from '@angular/core/testing';

import { ResolveServService } from './resolve-serv.service';

describe('ResolveServService', () => {
  let service: ResolveServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolveServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
