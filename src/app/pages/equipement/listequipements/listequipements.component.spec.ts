import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListequipementsComponent } from './listequipements.component';

describe('ListequipementsComponent', () => {
  let component: ListequipementsComponent;
  let fixture: ComponentFixture<ListequipementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListequipementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListequipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
