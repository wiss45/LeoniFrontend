import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelService } from '../../../services/excel.service';
import { EquipementService } from '../../../services/equipement.service';
import { ImportResult } from '../../../interfaces/ImportResult';

@Component({
  selector: 'app-importexcel',
  standalone: false,
  templateUrl: './importexcel.component.html',
  styleUrl: './importexcel.component.css'
})
export class ImportexcelComponent {
  selectedFile: File | null = null;
isUploading = false;
importResult: ImportResult | null = null;
error = '';

constructor(private excelService: ExcelService) {}

onFileChange(event: any): void {
  const file = event.target.files[0];
  this.selectedFile = file;
  this.error = '';
  this.importResult = null;

  if (file) {
    this.isUploading = true;

    this.excelService.uploadFile(file).subscribe({
      next: (res) => {
        this.importResult = res;
        alert(res.message);
        this.isUploading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Erreur lors de l\'importation';
        alert('Erreur : ' + this.error);
        this.isUploading = false;
      }
    });
  }
}

formatFileSize(bytes: number = 0, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
  
}
