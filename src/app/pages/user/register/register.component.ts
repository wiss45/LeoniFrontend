import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

userfrom! : FormGroup
errorMessage: string = '';


Roles =[
  {id:"ADMIN",name:"Admin"},
  {id:"USER",name:"User"}

]

constructor(private serviceRegister : UserService , private fb : FormBuilder,private router : Router, private toastr: ToastrService) {
  this.userfrom = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    roles: this.fb.array([], Validators.required), 
  });
}

get roles(): FormArray {
  return this.userfrom.get('roles') as FormArray;
}


onRoleChange(role: string, event: any) {
  if (event.target.checked) {
    this.roles.push(this.fb.control(role)); 
  } else {
    const index = this.roles.controls.findIndex(x => x.value === role);
    this.roles.removeAt(index); 
  }
} 


Register(myform: User): void {
  if (this.userfrom.valid) {
     this.errorMessage = '';
    this.serviceRegister.register(myform).subscribe({
      next: (response) => {
        this.toastr.success('Utilisateur enregistré avec succès ! ✅', 'Succès'); 
        this.router.navigate([''])
        console.log(response);
      },
      error: (err) => {
        this.toastr.error('Échec de l\'enregistrement ❌', 'Erreur'); 
        console.error("Erreur lors de l'ajout d'User", err);
         this.errorMessage = "Échec de l’inscription. Nom Utilisateur ou Email utilisé déja!.";

      }
    });
  } else {
    this.toastr.warning('Veuillez remplir correctement le formulaire ⚠️', 'Formulaire invalide');
  }
}

}
