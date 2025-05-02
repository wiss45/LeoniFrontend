import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private Url = environment.URL + 'auth/login'
  constructor(private http: HttpClient , private router : Router) { }

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

  isUserLoggedIn() {
    let user = sessionStorage.getItem('token')
    return !(user === null)
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
