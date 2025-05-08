import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Plan } from '../interfaces/plan';
import { PaginatedPlanResponse } from '../interfaces/paginatedResponsePlan';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl = environment.URL + 'plans/'; 

  constructor(private http: HttpClient) {}


  getAllPlans(page: number , size: number ): Observable<PaginatedPlanResponse<Plan>> {

    return this.http.get<PaginatedPlanResponse<Plan>>(`${this.apiUrl}page/?page=${page}&size=${size}`);
  }


  createPlan(plan: any): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, plan);
  }

 
  updatePlan(id: number, plan: any): Observable<Plan> {
    return this.http.put<Plan>(`${this.apiUrl}/${id}`, plan);
  }
 
  
  deletePlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  getPlanParProjetId(id:number) : Observable<Plan[]>  {
    return this.http.get<Plan[]>(`${this.apiUrl}projets/${id}`)
  }

 /* nombreEquipementsPlan(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}nombreequipementsplan/${id}`);
  }*/

}
