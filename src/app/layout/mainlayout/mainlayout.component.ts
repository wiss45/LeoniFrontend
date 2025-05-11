import { Component } from '@angular/core';



import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';
import { PlanService } from '../../services/plan.service';
import { Plan } from '../../interfaces/plan';
import { User } from '../../interfaces/User';
@Component({
  selector: 'app-mainlayout',
  standalone: false,
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css'],
})
export class MainlayoutComponent {

  isOpenuser: boolean = false;
  isOpenHamburger: boolean = false;
  itemActive :  string = ''
  user = sessionStorage.getItem("username")
  role = sessionStorage.getItem("role")
  User: User | null = null;
  notificationNomber : number = 0
  notificationNomberEquip : number = 0

   sidebarItems = [
  { name: "Dashboard", link: "/users", icon: "layout-dashboard" },
  { name: "Equipements", link: "/users/equipements", icon: "server" },
  { name: "Projets", link: "/users/projets", icon: "briefcase" },
  
];

  
  constructor( private serviceAuth : AuthentificationService , private serviceUser : UserService , private planService: PlanService){}

    ngOnInit(): void {
    this.CountNotifications();  // Initialiser le comptage des notifications

    // S'abonner aux mises à jour des notifications
    this.serviceUser.notificationsUpdated$.subscribe(() => {
      this.CountNotifications();  // Met à jour le comptage des notifications quand elles changent
    });

    this.loadPlanNotifications();  // Charger les notifications liées aux plans

    // Récupérer les données de l'utilisateur actuel
    this.serviceUser.getCurrentUser().subscribe({
      next: (data: User) => {
        this.User = data;  // Assure-toi que data est bien de type User
      },
      error: (err) => {
        console.error('Erreur de récupération des données utilisateur', err);
      }
    });
  }
  
  activeItems(Componentname : string) {
    this.itemActive=Componentname ;
  }

loadPlanNotifications(): void {
    this.planService.getPlans().subscribe((plans: Plan[]) => {
      const today = new Date();
      const plansToNotify = plans.filter(plan => {
        if (!plan.deliveryDate) return false;

        const deliveryDate = new Date(plan.deliveryDate);
        const diffInDays = Math.ceil((deliveryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
        return diffInDays === 1;
      });

      this.notificationNomberEquip = plansToNotify.length;
    });
  }


  toggleIconUser() {
    this.isOpenuser = !this.isOpenuser;
  }

  toggleIconHamburger() {
    this.isOpenHamburger = !this.isOpenHamburger;
  }

    
  
Logout () {
 this.serviceAuth.logout()
}


CountNotifications() : void {
  this.serviceUser.countNotifications().subscribe({
    next : (data) =>{
      this.notificationNomber=data
    },
    error : (err) => console.error("Erreur de récupération de nombre des notifications",err)
  })
}



  
}

