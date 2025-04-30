import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListplansComponent } from './listplans.component';

describe('ListplansComponent', () => {
  let component: ListplansComponent;
  let fixture: ComponentFixture<ListplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListplansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
