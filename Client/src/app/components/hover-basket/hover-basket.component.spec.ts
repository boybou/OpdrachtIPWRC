import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverBasketComponent } from './hover-basket.component';

describe('HoverBasketComponent', () => {
  let component: HoverBasketComponent;
  let fixture: ComponentFixture<HoverBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoverBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
