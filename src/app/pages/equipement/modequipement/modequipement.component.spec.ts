import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModequipementComponent } from './modequipement.component';

describe('ModequipementComponent', () => {
  let component: ModequipementComponent;
  let fixture: ComponentFixture<ModequipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModequipementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModequipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
