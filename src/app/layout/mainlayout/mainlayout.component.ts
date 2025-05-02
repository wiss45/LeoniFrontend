import { Component } from '@angular/core';



import { AuthentificationService } from '../../services/authentification.service';
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

   sidebarItems = [
  { name: "Dashboard", link: "/users", icon: "layout-dashboard" },
  { name: "Equipements", link: "/users/equipements", icon: "server" },
  { name: "Projets", link: "/users/projets", icon: "briefcase" },
  { name: "Plans", link: "/users/plans", icon: "file-text" },
];

  
  constructor( private serviceAuth : AuthentificationService){}

  
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
  
}

