import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plan } from '../../../interfaces/plan';
import { ProjetService } from '../../../services/projet.service';
import { EquipementService } from '../../../services/equipement.service';
import { Equipement } from '../../../interfaces/equipement';
import { Projet } from '../../../interfaces/projet';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-addplan',
  standalone: false,
  templateUrl: './addplan.component.html',
  styleUrl: './addplan.component.css'
})
export class AddplanComponent {
 
  @Input() IsOpen: boolean = false;
  @Input() Plan: Plan | null = null;
  @Input() TitleModal: string = '';
  @Output() CloseModal = new EventEmitter<void>();
  @Output() savePlan = new EventEmitter<Plan>();
  equipements : Equipement[]= []
  projets : Projet[]= []



  constructor(private serviceProjet :ProjetService , private serviceEquipement :EquipementService){}


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    
    forkJoin({
      equipements: this.serviceEquipement.getEquipements(),
      projets: this.serviceProjet.getProjets()
    }).subscribe({
      next: (data) => {
        this.equipements = data.equipements;
        this.projets = data.projets;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données', err);
      }
    });
  }

  close(): void {
    this.CloseModal.emit();
  }

  submit(): void {
    if (this.Plan) {
      this.savePlan.emit(this.Plan);
    }
  }
}
