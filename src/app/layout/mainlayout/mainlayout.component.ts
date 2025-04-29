import { Component } from '@angular/core';


import { Router } from '@angular/router';
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


   sidebarItems = [
  { name: "Dashboard", link: "/users", icon: "layout-dashboard" },
  { name: "Equipements", link: "/users/equipements", icon: "server" },
  { name: "Project", link: "/users/horraires", icon: "briefcase" },
  { name: "Plans", link: "/users/factures", icon: "file-text" },
];

  
  constructor( private router : Router){}

  
  activeItems(Componentname : string) {
    this.itemActive=Componentname ;
  }




  toggleIconUser() {
    this.isOpenuser = !this.isOpenuser;
  }

  toggleIconHamburger() {
    this.isOpenHamburger = !this.isOpenHamburger;
  }

    
  

  
}

