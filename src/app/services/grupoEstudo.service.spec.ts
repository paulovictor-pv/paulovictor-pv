import { TestBed } from '@angular/core/testing';

import { GrupoEstudoService } from './grupoEstudo.service';

describe('GrupoEstudoService', () => {
  let service: GrupoEstudoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoEstudoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
