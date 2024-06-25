import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPensamentoComponent } from './card-pensamento.component';

describe('CardPensamentoComponent', () => {
  let component: CardPensamentoComponent;
  let fixture: ComponentFixture<CardPensamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPensamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
