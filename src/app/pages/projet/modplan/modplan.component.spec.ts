import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModplanComponent } from './modplan.component';

describe('ModplanComponent', () => {
  let component: ModplanComponent;
  let fixture: ComponentFixture<ModplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModplanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
