import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ImportResult } from '../interfaces/ImportResult';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private apiUrl = 'http://localhost:8084/equipements/import';

  constructor(private http: HttpClient) {}
/*
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
      // ⚠️ NE PAS ajouter 'Content-Type' ici pour les FormData
    });
  }
  
  importEquipment(formData: FormData) {
    return this.http.post(`${this.apiUrl}/equipment`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  validateExcelFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/validate`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  analyzeExcelStructure(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/analyze`, formData, {
      headers: this.getAuthHeaders()
    });
  }*/

    
    uploadFile(file: File) {
      const formData = new FormData();
      formData.append('file', file);
    
      return this.http.post<ImportResult>(this.apiUrl, formData);
    }
    
    
    
    
    
    
    
}
