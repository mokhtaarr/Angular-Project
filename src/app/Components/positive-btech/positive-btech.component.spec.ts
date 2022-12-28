import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveBTECHComponent } from './positive-btech.component';

describe('PositiveBTECHComponent', () => {
  let component: PositiveBTECHComponent;
  let fixture: ComponentFixture<PositiveBTECHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositiveBTECHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositiveBTECHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
