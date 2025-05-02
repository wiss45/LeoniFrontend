import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private Url = environment.URL + 'users/register'

  constructor(private http : HttpClient) { }

  register (user : User) : Observable<User> {
  return  this.http.post<User>(this.Url,user)
  }
  
}
