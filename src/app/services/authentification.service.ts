import { HttpClient } from '@angular/common/http';
import { Inject, Injectable ,  PLATFORM_ID } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private Url = environment.URL + 'auth/login'
  constructor(private http: HttpClient , private router : Router,@Inject(PLATFORM_ID) private platformId: Object) { }

  login(username:any , password : any)  {
    return this.http.post<any>(this.Url , {username ,password}) .pipe(
      map(data => {
        sessionStorage.setItem('token',data.token)
        sessionStorage.setItem('username',data.username)
        sessionStorage.setItem('email',data.email)
        sessionStorage.setItem('role', data.roles[0]);
        sessionStorage.setItem('enabled',data.enabled);
        return data;
      })
     )
    
  }


  isUserLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('token');
      return user !== null;
    }
    return false;
  }


  logout () : void {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('enabled');
        this.router.navigate([''])
  } 
  
}
