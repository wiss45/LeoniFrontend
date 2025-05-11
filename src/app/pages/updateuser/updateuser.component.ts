import { Component } from '@angular/core';
import { RegisterRequest, RegisterResponse, User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-updateuser',
  standalone: false,
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent {
    userForm: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    roles: [],
    enabled : true
  };

  User: User | null = null;
  message: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Charger les informations actuelles de l'utilisateur
    this.loadUserData();
  }

   loadUserData() {
    // Appel API pour récupérer les informations de l'utilisateur authentifié
    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.userForm = {
          username: user.username,
          email: user.email,
          password: '',  // Laisser vide pour ne pas modifier le mot de passe par défaut
          roles: user.roles || [],
          enabled: user.enabled 
        };
        this.User = user; // Stocker l'utilisateur récupéré pour l'affichage
      },
      error: (err) => {
        this.message = 'Erreur lors du chargement des informations de l\'utilisateur';
        console.error(err);
      }
    });
  }

  onSubmit() {
    this.userService.updateCurrentUser(this.userForm).subscribe({
      next: (res: RegisterResponse) => {
        this.message = res.message; // Afficher un message de succès
      },
      error: (err) => {
        this.message = 'Erreur lors de la mise à jour du profil';
        console.error(err);
      }
    });
  }
}
