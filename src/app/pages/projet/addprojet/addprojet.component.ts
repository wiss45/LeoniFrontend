import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Projet } from '../../../interfaces/projet'; 
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/User';

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
      this.saveProjet.emit(this.Projet);
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
