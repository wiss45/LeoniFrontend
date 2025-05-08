import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModprojetComponent } from './modprojet.component';

describe('ModprojetComponent', () => {
  let component: ModprojetComponent;
  let fixture: ComponentFixture<ModprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModprojetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
