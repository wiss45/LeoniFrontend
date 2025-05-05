import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private apiUrl = 'http://localhost:8084/home/api/import';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token being used:', token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Import equipment data from Excel file
   * @param file Excel file containing equipment data
   * @param replaceExisting Flag to indicate if existing data should be replaced
   * @returns Observable with import results
   */
  importEquipmentData(file: File, replaceExisting: boolean = true): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('replaceExisting', replaceExisting.toString());

    return this.http.post(`${this.apiUrl}/equipment`, formData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Validate Excel file before upload
   * @param file Excel file to validate
   * @returns Observable with validation result
   */
  validateExcelFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/validate`, formData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Analyze Excel structure and detect column mapping
   * @param file Excel file to analyze
   * @returns Observable with analysis results
   */
  analyzeExcelStructure(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/analyze`, formData, {
      headers: this.getHeaders()
    });
  }
}
