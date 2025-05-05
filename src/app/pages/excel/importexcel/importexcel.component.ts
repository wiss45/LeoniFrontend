import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-importexcel',
  standalone: false,
  templateUrl: './importexcel.component.html',
  styleUrl: './importexcel.component.css' 
})
export class ImportexcelComponent implements OnInit {
  selectedFile: File | null = null;
  fileName: string = '';
  isValidFile: boolean = false;
  isUploading: boolean = false;
  replaceExisting: boolean = true;
  fileAnalysis: any = null;
  importResult: any = null;
  error: string = '';
  isAnalyzing: boolean = false;

  constructor(
    private equipmentImportService: ExcelService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /** Handle file selection event */
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
    this.isValidFile = false;
    this.fileAnalysis = null;
    this.importResult = null;
    this.error = '';

    if (this.selectedFile) {
      this.validateFile();
    }
  }

  /** Validate the selected Excel file */
  validateFile(): void {
    if (!this.selectedFile) {
      this.error = 'Please select a file first';
      return;
    }

    this.isAnalyzing = true;
    this.equipmentImportService.validateExcelFile(this.selectedFile).subscribe({
      next: (response) => {
        this.isValidFile = true;
        this.analyzeFile();
      },
      error: (error) => {
        this.isValidFile = false;
        this.error = error.error || 'Invalid file format';
        this.isAnalyzing = false;
        this.snackBar.open(this.error, 'Close', { duration: 5000 });
      }
    });
  }

  /** Analyze the Excel file structure */
  analyzeFile(): void {
    if (!this.selectedFile || !this.isValidFile) {
      return;
    }

    this.equipmentImportService.analyzeExcelStructure(this.selectedFile).subscribe({
      next: (analysis) => {
        this.fileAnalysis = analysis;
        this.isAnalyzing = false;
      },
      error: (error) => {
        this.error = error.error || 'Failed to analyze file';
        this.isAnalyzing = false;
        this.snackBar.open(this.error, 'Close', { duration: 5000 });
      }
    });
  }

  /** Import equipment data from the Excel file */
  importData(): void {
    if (!this.selectedFile || !this.isValidFile) {
      this.error = 'Please select a valid file first';
      this.snackBar.open(this.error, 'Close', { duration: 5000 });
      return;
    }

    this.isUploading = true;
    this.error = '';
    this.importResult = null;

    this.equipmentImportService.importEquipmentData(this.selectedFile, this.replaceExisting).subscribe({
      next: (result) => {
        this.importResult = result;
        this.isUploading = false;
        this.snackBar.open('Import successful!', 'Close', { duration: 5000 });
      },
      error: (error) => {
        this.error = error.error || 'Import failed';
        this.isUploading = false;
        this.snackBar.open(this.error, 'Close', { duration: 5000 });
      }
    });
  }

  /** Reset the form and selected file */
  resetForm(): void {
    this.selectedFile = null;
    this.fileName = '';
    this.isValidFile = false;
    this.fileAnalysis = null;
    this.importResult = null;
    this.error = '';
  }
}
