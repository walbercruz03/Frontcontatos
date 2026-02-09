import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoLista } from './contato-lista';

describe('ContatoLista', () => {
  let component: ContatoLista;
  let fixture: ComponentFixture<ContatoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatoLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
