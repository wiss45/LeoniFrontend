import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Plan } from '../interfaces/plan';
import { PaginatedPlanResponse } from '../interfaces/paginatedResponsePlan';
import { environment } from '../../environments/environment.development';

export enum StatutEquipement {
  EN_ATTENTE = 'EN_ATTENTE',
  RECU_EN_RETARD = 'RECU_EN_RETARD',
  RECU_A_TEMPS = 'RECU_A_TEMPS'
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl = environment.URL + 'plans/'; 

  constructor(private http: HttpClient) {}


  getAllPlans(page: number , size: number ): Observable<PaginatedPlanResponse<Plan>> {

    return this.http.get<PaginatedPlanResponse<Plan>>(`${this.apiUrl}page/?page=${page}&size=${size}`);
  }

    getPlans(): Observable<Plan[]> {

    return this.http.get<Plan[]>(`${this.apiUrl}allplans`);
  }


  createPlan(plan: any): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, plan);
  }

 
  updatePlan(id: number, plan: any): Observable<Plan> {
    return this.http.put<Plan>(`${this.apiUrl}${id}`, plan);
  }
 
  
  deletePlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  getPlanParProjetId(id:number) : Observable<Plan[]>  {
    return this.http.get<Plan[]>(`${this.apiUrl}projets/${id}`)
  }

  getPlanById(id:number) : Observable<Plan>  {
    return this.http.get<Plan>(`${this.apiUrl}${id}`)
  }

 /* nombreEquipementsPlan(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}nombreequipementsplan/${id}`);
  }*/

    getStatutCountsPerProjet(): Observable<Record<number, Record<StatutEquipement, number>>> {
    return this.http.get<Record<number, Record<StatutEquipement, number>>>(`${this.apiUrl}statut-par-projet`);
  }

}
