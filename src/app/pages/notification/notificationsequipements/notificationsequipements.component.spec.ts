import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsequipementsComponent } from './notificationsequipements.component';

describe('NotificationsequipementsComponent', () => {
  let component: NotificationsequipementsComponent;
  let fixture: ComponentFixture<NotificationsequipementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsequipementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsequipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
