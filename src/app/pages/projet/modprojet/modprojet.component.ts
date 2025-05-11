import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Projet } from '../../../interfaces/projet'; 
import { User } from '../../../interfaces/User';
import { UserService } from '../../../services/user.service';

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

responsables : User[] = []

constructor(private userService : UserService){}

ngOnInit () : void {
  this.loadUsers()
}


  close(): void {
    this.CloseModal.emit();
  }

  submit(): void {
    if (this.Projet) {
      this.savePRojet.emit(this.Projet);
    }
  }

    loadUsers(): void{
      this.userService.getAllUsers().subscribe({
        next : (data) => {
          this.responsables = data
          console.log(data)
        },
         error : (err) => console.error("Erreur lors de récupérations des users" , err)
      })
  }

}
