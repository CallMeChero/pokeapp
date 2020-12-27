import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoePokemonComponent } from './modal-aoe-pokemon.component';

describe('ModalAoePokemonComponent', () => {
  let component: ModalAoePokemonComponent;
  let fixture: ComponentFixture<ModalAoePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAoePokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
