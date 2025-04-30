import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipement } from '../interfaces/equipement';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PaginatedResponseEquipement } from '../interfaces/PaginatedResponseEquipements';


@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  private apiUrl = environment.URL + 'equipements/'; 

  constructor(private http: HttpClient) {}

  
  addEquipement(equipement: Equipement): Observable<Equipement> {
    return this.http.post<Equipement>(`${this.apiUrl}`, equipement);
  }

  getEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.apiUrl);
  }

  getAllEquipements(page: number, size: number): Observable<PaginatedResponseEquipement<Equipement>> {
    return this.http.get<PaginatedResponseEquipement<Equipement>>(`${this.apiUrl}page?page=${page}&size=${size}`);
  }
  
  


  updateEquipement(id: number, equipement: Equipement): Observable<Equipement> {
    return this.http.put<Equipement>(`${this.apiUrl}${id}`, equipement);
  }

  
  deleteEquipement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }


}
