import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Projet } from '../../../interfaces/projet'; 

@Component({
  selector: 'app-addprojet',
  standalone: false,
  templateUrl: './addprojet.component.html',
  styleUrls: ['./addprojet.component.css']
})
export class AddprojetComponent {

  @Input() IsOpen: boolean = false;
  @Input() Projet: Projet | null = null;
  @Input() TitleModal: string = '';
  @Output() CloseModal = new EventEmitter<void>();
  @Output() saveProjet = new EventEmitter<Projet>();

  close(): void {
    this.CloseModal.emit();
  }

  submit(): void {
    if (this.Projet) {
      this.saveProjet.emit(this.Projet);
    }
  }

}
