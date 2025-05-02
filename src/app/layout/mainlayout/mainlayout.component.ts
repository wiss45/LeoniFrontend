import { Component } from '@angular/core';



import { AuthentificationService } from '../../services/authentification.service';
import { UserService } from '../../services/user.service';
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

  notificationNomber : number = 0

   sidebarItems = [
  { name: "Dashboard", link: "/users", icon: "layout-dashboard" },
  { name: "Equipements", link: "/users/equipements", icon: "server" },
  { name: "Projets", link: "/users/projets", icon: "briefcase" },
  { name: "Plans", link: "/users/plans", icon: "file-text" },
];

  
  constructor( private serviceAuth : AuthentificationService , private serviceUser : UserService){}

  ngOnInit(): void {
    this.CountNotifications();
    
    // S'abonner aux mises à jour
    this.serviceUser.notificationsUpdated$.subscribe(() => {
      this.CountNotifications();
    });
  }
  
  activeItems(Componentname : string) {
    this.itemActive=Componentname ;
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

