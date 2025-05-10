import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 // Assurez-vous d'avoir l'URL de votre API dans environment.ts

import {PaginatedResponseProjet } from '../interfaces/PaginatedResponseProjet';
import { environment } from '../../environments/environment.development';
import { Projet } from '../interfaces/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = environment.URL + 'projets/';

  constructor(private http: HttpClient) { }

  
  getAllProjets(page : number , size : number): Observable<PaginatedResponseProjet<Projet>> {
    return this.http.get<PaginatedResponseProjet<Projet>>(`${this.apiUrl}page?page=${page}&size=${size}`);
  }

  getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiUrl);
  }

getProjetsByResponsable(responsable: string, page: number, size: number): Observable<any> {
  const encodedResponsable = encodeURIComponent(responsable); // Encoder le nom du responsable
  return this.http.get(`http://localhost:8084/projets/by-responsable?responsable=${encodedResponsable}&page=${page}&size=${size}`);
}



  createProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet);
  }


  updateProjet(id: number, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}${id}`, projet);
  }


  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  NombreProjets() : Observable<number> {
    return this.http.get<number>(`${this.apiUrl}nombreProjets`)
   }

   getApprovedProjets() : Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}draftprojets`)
   }
}
