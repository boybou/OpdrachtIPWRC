import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverBasketItemComponent } from './hover-basket-item.component';

describe('HoverBasketItemComponent', () => {
  let component: HoverBasketItemComponent;
  let fixture: ComponentFixture<HoverBasketItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoverBasketItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverBasketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
