import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddequipementComponent } from './addequipement.component';

describe('AddequipementComponent', () => {
  let component: AddequipementComponent;
  let fixture: ComponentFixture<AddequipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddequipementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddequipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
