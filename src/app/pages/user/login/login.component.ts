import { Component } from '@angular/core';
import { AuthentificationService } from '../../../services/authentification.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private service : AuthentificationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(username:string , password:string): void {
    if (this.loginForm.valid){
      this.service.login(username,password).subscribe({
        next : (response)=> {
          this.router.navigate(['users'])
          console.log(response)
        },
        error : (err)=> {
          console.error("Erreur lors de connexion",err)
        }
      })
    }

   

}
}




