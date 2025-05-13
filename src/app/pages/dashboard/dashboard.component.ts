import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { EquipementService } from '../../services/equipement.service';
import { ProjetService } from '../../services/projet.service';
import { forkJoin } from 'rxjs';
import { Projet } from '../../interfaces/projet';
import { PlanService, StatutEquipement } from '../../services/plan.service';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

nombreEquipements : number = 0 ;
nombreProjets : number = 0 ;
currentDate = new Date();
projetsapproved : Projet[] = []

projetStat = [
  {
    label: 'Projets Actifs',
    value: 24,
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
    trend: 'up',
    change: 12
  }]

  EquipementStat = [ {
    label: 'Équipements',
    value: 143,
    iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    borderColor: 'border-green-500',
    textColor: 'text-green-600',
    trend: 'up',
    change: 8
  }]
 


recentActivities = [
  {
    title: 'Nouveau projet créé',
    time: 'Il y a 2 heures',
    user: 'Mohamed Ali',
    bgColor: 'bg-blue-500',
    iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
  },
  // ... autres activités
];

recentProjects = [
  {
    name: 'Projet Alpha',
    code: 'LE-2023-001',
    initials: 'PA',
    manager: 'Samia Ben Ahmed',
    department: 'Production',
    status: 'En cours',
    progress: 65,
    deliveryDate: new Date('2023-12-15')
  },
  // ... autres projets
];


 statutData: Record<number, Record<StatutEquipement, number>> = {};

  statutKeys = Object.values(StatutEquipement);



constructor(private serviceEquipements : EquipementService , private serviceProjets : ProjetService , private planService: PlanService ) { }


ngOnInit() : void {
    this.planService.getStatutCountsPerProjet().subscribe(data => {
      this.statutData = data;
      console.log(data)
    });
this.loadstat()
}


getPercentage(value: number, max: number): number {
  return max > 0 ? (value / max) : 0;
}

getMaxValue(projetData: Record<StatutEquipement, number>): number {
  const values = Object.values(projetData) as number[];
  return Math.max(...values, 0); // Ajout de 0 comme fallback
}


 
  // Méthodes pour les graphiques
  getTrendHeight(value: number, trendData: number[]): number {
    const maxValue = Math.max(...trendData, 1);
    return (value / maxValue) * 20; // 20px de hauteur max
  }

  getTrendPoints(trendData: number[]): string {
    const maxValue = Math.max(...trendData, 1);
    return trendData.map((value, index) => {
      const x = (index / (trendData.length - 1)) * 100;
      const y = 40 - (value / maxValue) * 35;
      return `${x},${y}`;
    }).join(' ');
  }

loadstat() : void {
 const equipements = this.serviceEquipements.NombreEquipements()
 const projets = this.serviceProjets.NombreProjets()
 const projet = this.serviceProjets.getApprovedProjets()
 forkJoin([equipements,projets,projet]).subscribe({
  next: (data:any) => {
    this.nombreEquipements=data[0]
    this.nombreProjets=data[1]
    this.projetsapproved=data[2]

   },
   error : (err) => console.error("Erreur récupération de nombre des équipements" ,err)
  })
 }
  


  
}
 
 

