import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private Url = environment.URL + 'users/'

  constructor(private http : HttpClient) { }
  private notificationsUpdated = new Subject<void>();
  
  notificationsUpdated$ = this.notificationsUpdated.asObservable();

  register (user : User) : Observable<User> {
  return  this.http.post<User>(`${this.Url}register`,user)
  }

  countNotifications() : Observable<number> {
    return this.http.get<number>(`${this.Url}nombreNotifications`)
  }

  deleteNotifications(id:number) : Observable<void>{
    return this.http.delete<void>(`${this.Url}${id}`)
  }

  ActiveUser(id:number) : Observable<User>{
    return this.http.put<User>(`${this.Url}${id}`,{})
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.Url)
  }
  
  notifyUpdates() {
    this.notificationsUpdated.next();
  }
}
