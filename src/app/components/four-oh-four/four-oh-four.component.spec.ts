import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourOhFourComponent } from './four-oh-four.component';

describe('FourOhFourComponent', () => {
  let component: FourOhFourComponent;
  let fixture: ComponentFixture<FourOhFourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FourOhFourComponent]
    });
    fixture = TestBed.createComponent(FourOhFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
