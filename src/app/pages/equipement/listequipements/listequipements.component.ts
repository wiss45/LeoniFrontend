import { Component } from '@angular/core';
import { EquipementService } from '../../../services/equipement.service';
import { Equipement } from '../../../interfaces/equipement';

@Component({
  selector: 'app-listequipements',
  standalone: false,
  templateUrl: './listequipements.component.html',
  styleUrl: './listequipements.component.css'
})
export class ListequipementsComponent {
  

  equipement : Equipement |null =null
  isOpen : boolean = false
  inputSearch : string = ""
  filtredList : Equipement[] = [];
  page : number = 1
  size : number = 10
  equipements: Equipement[] = [];
  totalpages:  number = 0
  constructor(private equipementService: EquipementService) {}

  ngOnInit(): void {
    this.loadEquipements()
  }

  loadEquipements() : void {
    this.equipementService.getAllEquipements(this.page-1,this.size).subscribe({
      next: (data) => {
        this.equipements=data.content
        this.filtredList = data.content
        this.totalpages=data.totalPages
      },
      error: (error) => {
        console.error('Erreur lors du chargement des équipements', error);
      }
    });
  }

  delEquipement(id:number) : void {
    if(confirm("Are you Sure?")){
      this.equipementService.deleteEquipement(id).subscribe({
        next : (response) => {
          this.loadEquipements()
          console.log(response)
        },
        error : (err) => {
         console.log("Erreur loprs de suppression d'Equipement",err)
        }
      })
    }
  }


  search() : void {
    if(this.inputSearch.trim() ==='') {
   this.filtredList = this.equipements
    }else{
      this.filtredList=this.equipements.filter(equipement => 
        equipement.name.toLowerCase().includes(this.inputSearch.toLowerCase())
      )
    }
  }


  closeModal() {
   this.equipement=null
   this.isOpen=false
  }

  openModalAjout(equipement : Equipement) {
    this.equipement={... equipement}
    this.isOpen=true
  }
  

  add(equipement : Equipement){
    if(equipement) {
      this.equipementService.addEquipement(equipement).subscribe({
       next : (response) => {
        this.loadEquipements()
        this.closeModal()
       } ,
       error : (err) => 
        console.error("Erreur lors de l'ajout d'équipement",err)
       
      })
    }

  }

}
