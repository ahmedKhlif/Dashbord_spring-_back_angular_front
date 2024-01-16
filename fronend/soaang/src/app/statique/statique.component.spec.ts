import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatiqueComponent } from './statique.component';

describe('StatiqueComponent', () => {
  let component: StatiqueComponent;
  let fixture: ComponentFixture<StatiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatiqueComponent]
    });
    fixture = TestBed.createComponent(StatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
