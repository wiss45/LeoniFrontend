import { Component } from '@angular/core';
import { Projet } from '../../../interfaces/projet';
import { ProjetService } from '../../../services/projet.service';
import { Equipement } from '../../../interfaces/equipement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listprojets',
  standalone: false,
  templateUrl: './listprojets.component.html',
  styleUrl: './listprojets.component.css'
})
export class ListprojetsComponent {

selectedProjet: Projet | null = null;
projets:Projet [] = []
filtredlist :Projet [] = []
inputSearch : string = ''
isOpen : boolean = false
page: number = 1
size: number = 10
totalpages : number = 0
projet : Projet | null = null
showEquipementDetails: boolean = false;
selectedProjetEquipements: Equipement[] = [];

constructor(private service:ProjetService,private router :Router){}

toggleEquipementDetails(projetId: number) {
  const projet = this.filtredlist.find(p => p.id === projetId);
  if (projet && projet.equipements) {
    this.selectedProjet = projet;
    this.selectedProjetEquipements = projet.equipements;
    this.showEquipementDetails = true;
  } else {
    this.selectedProjet = null;
    this.selectedProjetEquipements = []; 
    this.showEquipementDetails = false; 
  }
}


closeEquipementDetails() {
  this.selectedProjet = null;
  this.showEquipementDetails = false;
  this.selectedProjetEquipements = [];
}

ngOnInit() : void {
this.loadProjets()
}

loadProjets () : void {
  this.service.getAllProjets(this.page-1,this.size).subscribe({
    next : (data) => {
      this.projets=data.content
      this.filtredlist=data.content
      this.totalpages=data.totalPages
      console.log(data)
    },
    error : (err) => console.error("Erreur lors de récupération des projets" , err)
  })
}

 delProjet(id:number) : void {
    if(confirm("Are you Sure?")){
      this.service.deleteProjet(id).subscribe({
        next : (response) => {
          this.loadProjets()
          console.log(response)
        },
        error : (err) => {
         console.log("Erreur loprs de suppression de projet",err)
        }
      })
    }
  }


  search() : void {
    if(this.inputSearch.trim() ==='') {
   this.filtredlist = this.projets
    }else{
      this.filtredlist=this.projets.filter(projet => 
        projet.name.toLowerCase().includes(this.inputSearch.toLowerCase())
      )
    }
  }


  closeModal() {
   this.projet=null
   this.isOpen=false
  }

  openModalAjout(projet: Projet) {
    this.projet={... projet}
    this.isOpen=true
  }
  

  add(projet: Projet){
    if(projet) {
      this.service.createProjet(projet).subscribe({
       next : () => {
        this.loadProjets()
        this.closeModal()
       } ,
       error : (err) => 
        console.error("Erreur lors de l'ajout de projet",err)
       
      })
    }

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
                <h1 class="document-title">EQUIPEMENTS DU PROJET</h1>
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
