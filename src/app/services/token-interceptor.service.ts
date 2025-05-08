import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorsService implements HttpInterceptor {

  constructor(private router: Router) {}

  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const expirationDate = decodedToken.exp * 1000; 
    return new Date().getTime() > expirationDate;
  }
  
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('token');
    

   


    if (token && !this.isTokenExpired(token)) {
      if (!(req.body instanceof FormData)) {
        req = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
      } else {
        req = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } else {
      if (!(req.body instanceof FormData)) {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
      }
    }
   
    

    /*if (token) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    } else {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    }*/

    // Gestion des erreurs
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log("Erreur 401 Unauthorized - Token invalide ou expiré");
          this.router.navigate(['']); 
        } else if (error.status === 500) {
          console.log("Erreur serveur interne");
          
        }
        return throwError(() => error);
      })
      
    );
  }

}
