import { TestBed } from '@angular/core/testing';

import { GrupoGeralService } from './grupoGeral.service';

describe('GrupoGeralService', () => {
  let service: GrupoGeralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoGeralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
