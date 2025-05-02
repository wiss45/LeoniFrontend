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

projets:Projet [] = []
filtredlist :Projet [] = []
inputSearch : string = ''
isOpen : boolean = false
page: number = 1
size: number = 10
totalpages : number = 0
projet : Projet | null = null

constructor(private service:ProjetService,private router :Router){}


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


 
}
