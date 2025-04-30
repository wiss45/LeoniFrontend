import { Component } from '@angular/core';
import { PlanService } from '../../../services/plan.service';
import { Plan } from '../../../interfaces/plan';
import { Equipement } from '../../../interfaces/equipement';

@Component({
  selector: 'app-listplans',
  standalone: false,
  templateUrl: './listplans.component.html',
  styleUrl: './listplans.component.css'
})
export class ListplansComponent {

  plan: Plan | null = null;
  isOpen: boolean = false;
  inputSearch: string = '';
  filtredList: Plan[] = [];
  page: number = 1;
  size: number = 10;
  plans: Plan[] = [];
  totalpages: number = 0;

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.planService.getAllPlans(this.page - 1, this.size).subscribe({
      next: (data) => {
        this.plans = data.content;
        this.filtredList = data.content;
        this.totalpages = data.totalPages;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des plans', error);
      }
    });
  }

  delPlan(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce plan ?')) {
      this.planService.deletePlan(id).subscribe({
        next: () => {
          this.loadPlans();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du plan", err);
        }
      });
    }
  }

  search(): void {
    if (this.inputSearch.trim() === '') {
      this.filtredList = this.plans;
    } else {
      this.filtredList = this.plans.filter(plan =>
        plan.projet.name.toLowerCase().includes(this.inputSearch.toLowerCase())
      );
    }
  }

  closeModal(): void {
    this.plan = null;
    this.isOpen = false;
  }

  openModalAjout(plan: Plan): void {
    this.plan = { ...plan };
    this.isOpen = true;
  }

  add(plan: Plan): void {
    if (plan) {
      this.planService.createPlan(plan).subscribe({
        next: () => {
          this.loadPlans();
          this.closeModal();
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du plan", err);
        }
      });
    }
  }

  showEquipementDetails: boolean = false;
  selectedPlanEquipements: Equipement[] = [];

  toggleEquipementDetails(planId: number) {
    const plan = this.filtredList.find(p => p.id === planId);
    if (plan && plan.equipements) {
      this.selectedPlanEquipements = plan.equipements;
      this.showEquipementDetails = true;
    } else {
      this.selectedPlanEquipements = []; 
      this.showEquipementDetails = false; 
    }
  }

  
  closeEquipementDetails() {
    this.showEquipementDetails = false;
    this.selectedPlanEquipements = [];
  }


  printPlanList(): void {
    const printContents = document.getElementById('plan-list')?.innerHTML || '';
    const printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow?.document.write(`
      <html>
        <head>
          <title>Liste des Plans - Leoni Tunisie</title>
          <style>
            /* Reset et base */
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              color: #333;
              font-size: 10pt;
              line-height: 1.4;
            }
            
            /* Layout général */
            .page-container {
              padding: 15mm;
            }
            
            /* En-tête corporate */
            .header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding-bottom: 8px;
              border-bottom: 1.5px solid #00558B;
            }
            
            .company-header {
              display: flex;
              align-items: center;
            }
            
            .logo-container {
              margin-right: 15px;
            }
            
            .logo-container img {
              height: 25mm;
              width: auto;
            }
            
            .company-info {
              font-size: 9pt;
              line-height: 1.4;
            }
            
            .company-name {
              color: #00558B;
              font-weight: 600;
              font-size: 12pt;
              margin-bottom: 3px;
            }
            
            .company-address {
              margin-bottom: 2px;
            }
            
            .company-contact {
              margin-top: 5px;
            }
            
            .company-contact span {
              display: inline-block;
              margin-right: 10px;
            }
            
            .document-info {
              text-align: right;
            }
            
            .document-title {
              color: #00558B;
              font-size: 16pt;
              font-weight: 600;
              margin: 0;
            }
            
            .document-subtitle {
              color: #555;
              font-size: 10pt;
              margin: 2px 0 8px 0;
            }
            
            .document-meta {
              font-size: 9pt;
              color: #666;
            }
            
            /* Tableau professionnel */
            .data-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
              font-size: 9pt;
              page-break-inside: auto;
            }
            
            .data-table thead th {
              background-color: #00558B;
              color: white;
              padding: 6px 8px;
              text-align: left;
              font-weight: 600;
              font-size: 8.5pt;
              border: 1px solid #004074;
            }
            
            .data-table tbody td {
              padding: 5px 8px;
              border: 1px solid #e0e0e0;
              vertical-align: middle;
            }
            
            .data-table tbody tr:nth-child(even) {
              background-color: #f8fafc;
            }
            
            /* Styles spécifiques colonnes */
            .col-pam {
              width: 8%;
              font-weight: 600;
              color: #00558B;
            }
            
            .col-projet {
              width: 18%;
            }
            
            .col-price {
              width: 8%;
              text-align: right;
              font-family: 'Courier New', monospace;
            }
            
            .col-quantity {
              width: 6%;
              text-align: center;
            }
            
            .col-order {
              width: 10%;
            }
            
            .col-date {
              width: 10%;
              white-space: nowrap;
            }
            
            .col-rpr {
              width: 10%;
              white-space: nowrap;
            }
            
            /* Pied de page */
            .footer {
              margin-top: 10mm;
              padding-top: 3mm;
              border-top: 1px solid #e0e0e0;
              font-size: 8pt;
              color: #666;
              text-align: center;
            }
            
            /* Utilitaires */
            .text-right {
              text-align: right;
            }
            
            .text-center {
              text-align: center;
            }
            
            .nowrap {
              white-space: nowrap;
            }
            
            /* Styles d'impression */
            @media print {
              @page {
                size: A4;
                margin: 15mm;
              }
              
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                width: 100%;
              }
              
              .no-print, .no-print * {
                display: none !important;
              }
              
              .page-break {
                page-break-after: always;
              }
              
              tr {
                page-break-inside: avoid;
                page-break-after: auto;
              }
            }
          </style>
        </head>
        <body>
          <div class="page-container">
            <!-- En-tête avec coordonnées complètes -->
            <div class="header">
              <div class="company-header">
                <div class="logo-container">
                  <img src="path-to-leoni-logo.png" alt="LEONI Tunisie" />
                </div>
                <div class="company-info">
                  <div class="company-name">LEONI Wiring Systems Tunisie</div>
                  <div class="company-address">Zone Industrielle Charguia 1, 2035 Tunis-Carthage</div>
                  <div class="company-address">Tunisie</div>
                  <div class="company-contact">
                    <span><strong>Tél:</strong> +216 71 940 000</span>
                    <span><strong>Fax:</strong> +216 71 940 001</span>
                    <span><strong>Email:</strong> contact.tn@leoni.com</span>
                  </div>
                </div>
              </div>
              
              <div class="document-info">
                <h1 class="document-title">LISTE DES PLANS</h1>
                <div class="document-subtitle">Document technique - Suivi de production</div>
                <div class="document-meta">
                  Généré le ${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  &nbsp;|&nbsp;
                  Réf: PL-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
                </div>
              </div>
            </div>
            
            <!-- Tableau -->
            <table class="data-table">
              <thead>
                <tr>
                  <th class="col-pam">PAM</th>
                  <th class="col-projet">Projet</th>
                  <th class="col-price">Prix</th>
                  <th class="col-quantity">Qté</th>
                  <th class="col-order">Commande</th>
                  <th class="col-date">Cible</th>
                  <th class="col-date">Livraison</th>
                  <th class="col-rpr">RPR</th>
                </tr>
              </thead>
              <tbody>
                ${printContents}
              </tbody>
            </table>
            
            <!-- Pied de page -->
            <div class="footer">
              LEONI Wiring Systems Tunisie &copy; ${new Date().getFullYear()} 
              | RC: 12345678A/M/B 
              | MF: 12345678 
              | N°TVA: 12345678
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
}
  


  printModalContent(): void {
    const printContents = document.getElementById('modal-content')?.innerHTML || '';
    const printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow?.document.write(`
      <html>
        <head>
          <title>Liste des Plans - Leoni Tunisie</title>
          <style>
            /* Reset et base */
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 0;
              color: #333;
              font-size: 10pt;
              line-height: 1.4;
            }
            
            /* Layout général */
            .page-container {
              padding: 15mm;
            }
            
            /* En-tête corporate */
            .header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding-bottom: 8px;
              border-bottom: 1.5px solid #00558B;
            }
            
            .company-header {
              display: flex;
              align-items: center;
            }
            
            .logo-container {
              margin-right: 15px;
            }
            
            .logo-container img {
              height: 25mm;
              width: auto;
            }
            
            .company-info {
              font-size: 9pt;
              line-height: 1.4;
            }
            
            .company-name {
              color: #00558B;
              font-weight: 600;
              font-size: 12pt;
              margin-bottom: 3px;
            }
            
            .company-address {
              margin-bottom: 2px;
            }
            
            .company-contact {
              margin-top: 5px;
            }
            
            .company-contact span {
              display: inline-block;
              margin-right: 10px;
            }
            
            .document-info {
              text-align: right;
            }
            
            .document-title {
              color: #00558B;
              font-size: 16pt;
              font-weight: 600;
              margin: 0;
            }
            
            .document-subtitle {
              color: #555;
              font-size: 10pt;
              margin: 2px 0 8px 0;
            }
            
            .document-meta {
              font-size: 9pt;
              color: #666;
            }
            
            /* Tableau professionnel */
            .data-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
              font-size: 9pt;
              page-break-inside: auto;
            }
            
            .data-table thead th {
              background-color: #00558B;
              color: white;
              padding: 6px 8px;
              text-align: left;
              font-weight: 600;
              font-size: 8.5pt;
              border: 1px solid #004074;
            }
            
            .data-table tbody td {
              padding: 5px 8px;
              border: 1px solid #e0e0e0;
              vertical-align: middle;
            }
            
            .data-table tbody tr:nth-child(even) {
              background-color: #f8fafc;
            }
            
            /* Styles spécifiques colonnes */
            .col-pam {
              width: 8%;
              font-weight: 600;
              color: #00558B;
            }
            
            .col-projet {
              width: 18%;
            }
            
            .col-price {
              width: 8%;
              text-align: right;
              font-family: 'Courier New', monospace;
            }
            
            .col-quantity {
              width: 6%;
              text-align: center;
            }
            
            .col-order {
              width: 10%;
            }
            
            .col-date {
              width: 10%;
              white-space: nowrap;
            }
            
            .col-rpr {
              width: 10%;
              white-space: nowrap;
            }
            
            /* Pied de page */
            .footer {
              margin-top: 10mm;
              padding-top: 3mm;
              border-top: 1px solid #e0e0e0;
              font-size: 8pt;
              color: #666;
              text-align: center;
            }
            
            /* Utilitaires */
            .text-right {
              text-align: right;
            }
            
            .text-center {
              text-align: center;
            }
            
            .nowrap {
              white-space: nowrap;
            }
            
            /* Styles d'impression */
            @media print {
              @page {
                size: A4;
                margin: 15mm;
              }
              
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                width: 100%;
              }
              
              .no-print, .no-print * {
                display: none !important;
              }
              
              .page-break {
                page-break-after: always;
              }
              
              tr {
                page-break-inside: avoid;
                page-break-after: auto;
              }
            }
          </style>
        </head>
        <body>
          <div class="page-container">
            <!-- En-tête avec coordonnées complètes -->
            <div class="header">
              <div class="company-header">
                <div class="logo-container">
                  <img src="path-to-leoni-logo.png" alt="LEONI Tunisie" />
                </div>
                <div class="company-info">
                  <div class="company-name">LEONI Wiring Systems Tunisie</div>
                  <div class="company-address">Zone Industrielle Charguia 1, 2035 Tunis-Carthage</div>
                  <div class="company-address">Tunisie</div>
                  <div class="company-contact">
                    <span><strong>Tél:</strong> +216 71 940 000</span>
                    <span><strong>Fax:</strong> +216 71 940 001</span>
                    <span><strong>Email:</strong> contact.tn@leoni.com</span>
                  </div>
                </div>
              </div>
              
              <div class="document-info">
                <h1 class="document-title">EQUIPEMENTS DU PLAN</h1>
                <div class="document-subtitle">Document technique - Suivi de production</div>
                <div class="document-meta">
                  Généré le ${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  &nbsp;|&nbsp;
                  Réf: PL-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
                </div>
              </div>
            </div>
        </head>
        <body>
          <h2 style="text-align: center; color: #00558B;">Equipements</h2>
          <div style="font-weight: bolder;">
            ${printContents}
          </div>
        <!-- Pied de page -->
            <div class="footer">
              LEONI Wiring Systems Tunisie &copy; ${new Date().getFullYear()} 
              | RC: 12345678A/M/B 
              | MF: 12345678 
              | N°TVA: 12345678
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  }
}
