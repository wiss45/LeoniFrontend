import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Equipement } from '../../../interfaces/equipement';

@Component({
  selector: 'app-modequipement',
  standalone: false,
  templateUrl: './modequipement.component.html',
  styleUrl: './modequipement.component.css'
})
export class ModequipementComponent {


@Input() IsOpen : boolean = false
@Input() Equipement : Equipement | null = null
@Input() TitleModal : string =''
@Output() CloseModal = new EventEmitter<void> ()
@Output() saveEQuipement = new EventEmitter<Equipement> ()

close() : void {
  this.CloseModal.emit()
}

submit() : void {
  if(this.Equipement){
    this.saveEQuipement.emit(this.Equipement)
  }
}

}
