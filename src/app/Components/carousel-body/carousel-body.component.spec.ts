import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselBodyComponent } from './carousel-body.component';

describe('CarouselBodyComponent', () => {
  let component: CarouselBodyComponent;
  let fixture: ComponentFixture<CarouselBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
