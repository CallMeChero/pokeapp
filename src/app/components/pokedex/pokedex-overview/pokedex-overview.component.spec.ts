import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexOverviewComponent } from './pokedex-overview.component';

describe('PokedexOverviewComponent', () => {
  let component: PokedexOverviewComponent;
  let fixture: ComponentFixture<PokedexOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
