import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Projet } from '../../../interfaces/projet'; 

@Component({
  selector: 'app-modprojet',
  standalone: false,
  templateUrl: './modprojet.component.html',
  styleUrl: './modprojet.component.css'
})
export class ModprojetComponent {
  @Input() IsOpen: boolean = false;
  @Input() Projet: Projet | null = null;
  @Input() TitleModal: string = '';
  @Output() CloseModal = new EventEmitter<void>();
  @Output() savePRojet = new EventEmitter<Projet>();

  close(): void {
    this.CloseModal.emit();
  }

  submit(): void {
    if (this.Projet) {
      this.savePRojet.emit(this.Projet);
    }
  }

}
