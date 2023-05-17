import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppareilComponent } from './edit-appareil.component';

describe('EditAppareilComponent', () => {
  let component: EditAppareilComponent;
  let fixture: ComponentFixture<EditAppareilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAppareilComponent]
    });
    fixture = TestBed.createComponent(EditAppareilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
