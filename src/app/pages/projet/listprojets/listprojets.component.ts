import { Component } from '@angular/core';
import { Projet } from '../../../interfaces/projet';
import { ProjetService } from '../../../services/projet.service';
import { Equipement } from '../../../interfaces/equipement';
import { Router } from '@angular/router';
import { PlanService } from '../../../services/plan.service';
import { Plan } from '../../../interfaces/plan';

@Component({
  selector: 'app-listprojets',
  standalone: false,
  templateUrl: './listprojets.component.html',
  styleUrl: './listprojets.component.css'
})
export class ListprojetsComponent {

  selectedprojet: Projet | null = null;
selectedProjet: Projet | null = null;
projets:Projet [] = []
filtredlist :Projet [] = []
inputSearch : string = ''
isOpen : boolean = false
Isopen: boolean = false
page: number = 1
size: number = 10
totalpages : number = 0
projet : Projet | null = null
showEquipementDetails: boolean = false;
selectedPlan: Plan | null = null;
plansParProjet: Plan[] = [];
showPlanModal: boolean = false;
plans: Plan[] = [];
filtredList: Plan[] = []
plan: Plan | null = null;
isOpenModalPlan: boolean = false;
username: string = '';
role: string = '';
isAdmin: boolean = false;


constructor(private service:ProjetService,private router :Router,private planService: PlanService ){}

ngOnInit() : void {
  this.username = sessionStorage.getItem('username') || '';
  this.role = sessionStorage.getItem('role') || '';
  this.isAdmin = this.role === 'ADMIN';
  this.loadProjets()
  this.loadPlans()
  }

 closeModalPlan(): void {
    this.plan = null;
    this.isOpenModalPlan = false;
  }

  openModalAjoutPlan(plan: Plan): void {
    this.plan = { ...plan };
    this.isOpenModalPlan = true;
  }

  addPlan(plan: Plan): void {
    if (plan) {
      this.planService.createPlan(plan).subscribe({
        next: (response) => {
          this.loadPlans();
          this.closeModalPlan();
          
          console.log(response)
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du plan", err);
          
        }
      });
    }
  }
  
  loadPlans(): void {
    this.planService.getAllPlans(this.page - 1, this.size).subscribe({
      next: (data) => {
        this.plans = data.content;
        this.filtredList = data.content;
        this.totalpages = data.totalPages;
        console.log(data)
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
           this.plansParProjet = this.plansParProjet.filter(p => p.id !== id);
        this.loadPlans();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du plan", err);
        }
      });
    }
  }

 /* toggleEquipementDetails(projetId: number) {
    const relatedPlans = this.filtredList.filter(p => p.projet.id === projetId);
  
    if (relatedPlans.length > 0) {
      this.selectedPlan = relatedPlans[0]; 
      this.showEquipementDetails = true;
    } else {
      this.selectedPlan = null;
      this.showEquipementDetails = false;
    }
  }

  closeEquipementDetails() {
  this.showEquipementDetails = false;
  this.selectedPlan = null;
}*/




openPlanModal(id: number): void {
  this.planService.getPlanParProjetId(id).subscribe({
    next: (data) => {
      this.plansParProjet = data;
      this.showPlanModal = true;
      console.log(data)
    },
    error: (err) => {
      console.error('Erreur lors du chargement des plans du projet', err);
    }
  });
}

closePlanModal(): void {
  this.plansParProjet = [];
  this.showPlanModal = false;
}


  modifier(id : number ,projet : Projet){
    if(projet) {
      this.service.updateProjet(id,projet).subscribe({
       next : (response) => {
        this.loadProjets()
        this.closeModalMod()
       } ,
       error : (err) => 
        console.error("Erreur lors de modification d'équipement",err)
       
      })
    }

  }  



loadProjets(): void {
  if (this.isAdmin) {
    this.service.getAllProjets(this.page - 1, this.size).subscribe({
      next: (data) => {
        this.projets = data.content;
        this.filtredlist = data.content;
        this.totalpages = data.totalPages;
      },
      error: (err) => console.error('Erreur lors de récupération des projets', err),
    });
  } else {
    this.service.getProjetsByResponsable(this.username, this.page - 1, this.size).subscribe({
      next: (data) => {
        this.projets = data.content;
        this.filtredlist = data.content;
        this.totalpages = data.totalPages;
      },
      error: (err) => console.error('Erreur lors de récupération des projets de l\'utilisateur', err),
    });
  }
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

  closeModalMod() {
    this.selectedprojet=null
    this.Isopen=false
   }
 
   openModalMod(projet : Projet) {
     this.selectedprojet={... projet}
     this.Isopen=true
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
    // Créer un clone du contenu de la modal sans les éléments non imprimables
    const modalContent = document.querySelector('.fixed.inset-0 .bg-white.rounded-xl')?.cloneNode(true) as HTMLElement;
    
    // Supprimer les éléments qu'on ne veut pas imprimer
    if (modalContent) {
      // Supprimer le header avec le titre et le bouton de fermeture
      const modalHeader = modalContent.querySelector('.flex.justify-between.items-center.mb-6');
      if (modalHeader) modalHeader.remove();
      
      // Supprimer les boutons d'action dans le tableau
      const actionButtons = modalContent.querySelectorAll('td.flex.gap-2');
      actionButtons.forEach(button => button.remove());
      
      // Supprimer les boutons en bas de la modal
      const modalFooter = modalContent.querySelector('.flex.justify-end.gap-3.mt-auto');
      if (modalFooter) modalFooter.remove();
      
      // Supprimer les effets de hover
      const hoverRows = modalContent.querySelectorAll('.hover\\:bg-gray-50');
      hoverRows.forEach(row => row.classList.remove('hover:bg-gray-50'));
      
      // Ajouter des styles pour l'impression
      const table = modalContent.querySelector('table');
      if (table) {
        table.classList.add('w-full', 'border-collapse');
      }
      
      const thElements = modalContent.querySelectorAll('th');
      thElements.forEach(th => {
        th.classList.add('bg-blue-600', 'text-white', 'p-2', 'border');
        th.classList.remove('px-6', 'py-3', 'border-b');
      });
      
      const tdElements = modalContent.querySelectorAll('td');
      tdElements.forEach(td => {
        td.classList.add('p-2', 'border');
        td.classList.remove('px-6', 'py-4', 'whitespace-nowrap');
      });

      // Gérer les statuts
      const statusSpans = modalContent.querySelectorAll('span');
      statusSpans.forEach(span => {
        span.classList.remove('px-2', 'py-1', 'text-xs', 'rounded-full');
        span.classList.add('font-semibold');
      });
    }

    const printContents = modalContent?.innerHTML || '';
    const printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow?.document.write(`
      <html>
        <head>
          <title>Équipements du Projet - Leoni Tunisie</title>
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

             .document-content {
              
              margin-right: 34mm;
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
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
              font-size: 9pt;
              page-break-inside: auto;
            }
            
            th {
              background-color: #00558B !important;
              color: white !important;
              padding: 8px !important;
              text-align: left;
              font-weight: 600;
              border: 1px solid #004074 !important;
            }
            
            td {
              padding: 6px 8px !important;
              border: 1px solid #ddd !important;
              vertical-align: middle;
            }
            
            tr:nth-child(even) {
              background-color: #f8fafc;
            }
            
            /* Styles spécifiques colonnes */
            .text-blue-600 {
              color: #00558B !important;
              font-weight: 600;
            }
            
            /* Styles pour les statuts */
            .bg-amber-100 {
              background-color: #fef3c7 !important;
              color: #92400e !important;
            }
            
            .bg-green-100 {
              background-color: #d1fae5 !important;
              color: #065f46 !important;
            }
            
            .bg-red-100 {
              background-color: #fee2e2 !important;
              color: #991b1b !important;
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
              .document-content {
              
                margin-right: 50mm !important;
              }
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
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTLC5ZC3GyLb-xf48iR9GpowGlf0-0EW35Q&s" alt="LEONI Tunisie" />
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
                <h1 class="document-title">DÉTAILS DES ÉQUIPEMENTS</h1>
                <div class="document-subtitle">Projet: ${this.selectedProjet?.name || 'Non spécifié'}</div>
                <div class="document-meta">
                  Généré le ${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  &nbsp;|&nbsp;
                  Réf: EQ-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
                </div>
              </div>
            </div>
            
            <!-- Contenu principal -->
            <div class="document-content mr-4">
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
    setTimeout(() => {
      printWindow?.print();
    }, 500);
}

goToFormUpdate(id:number) {
  this.router.navigate(['users/projets/modplan',id])
}

prevPage() {
  if(this.page > 1) {
    this.page -- ;
    this.loadProjets()
  }
}


nextPage() {
  if(this.page < this.totalpages) {
    this.page ++ ;
    this.loadProjets()
  }
}
 
}
