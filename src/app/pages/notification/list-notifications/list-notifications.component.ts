import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/User';
import { PlanService } from '../../../services/plan.service';
import { Plan } from '../../../interfaces/plan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-notifications',
  standalone: false,
  templateUrl: './list-notifications.component.html',
  styleUrl: './list-notifications.component.css'
})
export class ListNotificationsComponent {
   
  users : User[] = []
  

  constructor(private serviceUser : UserService , private planService: PlanService , private router : Router){}
  
  ngOnInit(): void{
  
   this.loadUsers()
  }



viewPlanDetails(planId: number) {
  // Navigation vers la page de détails
  this.router.navigate(['/plans', planId]);
}



  getRoleNames(roles: any[]): string {
    return roles.map(role => role.name).join(', ');
  }


  loadUsers() : void {
   this.serviceUser.getUsers().subscribe({
    next : (data) => {
      this.users = data
    },
    error : (err) => console.error("Erreur lors de récupération des users",err)
   })
  }

ActivateUser(id: number): void {
  if(confirm("Do you Activate this user?")) {
    this.serviceUser.ActiveUser(id).subscribe({
      next: () => {
        this.loadUsers();
        this.serviceUser.notifyUpdates(); // Notifier la mise à jour
      },
      error: (err) => console.error("Erreur d'activation", err)
    });
  }
}

DeleteNotification(id: number): void {
  if(confirm("Do you Delete this Notification?")) {
    this.serviceUser.deleteNotifications(id).subscribe({
      next: () => {
        this.loadUsers();
        this.serviceUser.notifyUpdates(); // Notifier la mise à jour
      },
      error: (err) => console.error("Erreur de suppression", err)
    });
  }
}

}
