import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Equipement } from '../../../interfaces/equipement';

@Component({
  selector: 'app-addequipement',
  standalone: false,
  templateUrl: './addequipement.component.html',
  styleUrl: './addequipement.component.css'
})
export class AddequipementComponent {


@Input() IsOpen : boolean = false
@Input() Equipement : Equipement | null = null
@Input() TitleModal : string =''
@Output() CloseModal = new EventEmitter<void> ()
@Output() saveEquipement = new EventEmitter<Equipement> ()

close() : void {
  this.CloseModal.emit()
}

submit() : void {
  if(this.Equipement){
    this.saveEquipement.emit(this.Equipement)
  }
}

}
