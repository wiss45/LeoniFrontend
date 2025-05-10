import { Component } from '@angular/core';
import { PlanService } from '../../../services/plan.service';
import { Plan } from '../../../interfaces/plan';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from '../../../interfaces/projet';
import { Equipement } from '../../../interfaces/equipement';
import { ProjetService } from '../../../services/projet.service';
import { EquipementService } from '../../../services/equipement.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-modplan',
  standalone: false,
  templateUrl: './modplan.component.html',
  styleUrl: './modplan.component.css'
})
export class ModplanComponent {

  statuts = [
    {id:"RECU_A_TEMPS" ,name:"Recu à temps"},
    {id:"RECU_EN_RETARD" ,name:"Recu en retard"},
  ]

  projets : Projet[] = []
  equipements : Equipement[] = []
  plan : Plan | null = null
  id! : number;

constructor(private servicePlan : PlanService ,   private  router : Router , private route : ActivatedRoute ){}

ngOnInit() : void {
  this.id = Number(this.route.snapshot.params['id']);
  this.loadPlan()
 
}

loadPlan(): void {
  this.servicePlan.getPlanById(this.id).subscribe({
    next: (data) => {
      
      this.plan = data;
    },
    error: (err) => {
      console.error("Erreur lors de la récupération du plan", err);
    }
  });
}



modifierPlan() : void  {
  this.servicePlan.updatePlan(this.id,this.plan).subscribe({
    next:(response) => {
      this.router.navigate(['users/projets'])
      console.log(response)
    },
    error : (err) => console.error("Erreur lors de modification du plan",err)
  })
}

}
