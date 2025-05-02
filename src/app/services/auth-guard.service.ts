import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthentificationService } from './authentification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthentificationService) { }

  canActivate() {
    if (this.authService.isUserLoggedIn())
      return true;
    this.router.navigate(['']);
    return false;
  }
}
