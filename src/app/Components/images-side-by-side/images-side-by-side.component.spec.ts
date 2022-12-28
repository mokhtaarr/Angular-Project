import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesSideBySideComponent } from './images-side-by-side.component';

describe('ImagesSideBySideComponent', () => {
  let component: ImagesSideBySideComponent;
  let fixture: ComponentFixture<ImagesSideBySideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesSideBySideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesSideBySideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
