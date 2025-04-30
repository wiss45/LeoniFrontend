import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprojetsComponent } from './listprojets.component';

describe('ListprojetsComponent', () => {
  let component: ListprojetsComponent;
  let fixture: ComponentFixture<ListprojetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListprojetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListprojetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
