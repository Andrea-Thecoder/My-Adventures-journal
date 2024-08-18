import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { Ilogin } from '../../models/generic-interfaces';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  regexEmail:RegExp = /^[a-zA-Z0-9._%+-]+(\.[a-zA-Z0-9._%+-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  regexPasswordCheck:RegExp =/.{8,16}/;


  private authServices = inject(AuthService);

  loginForm:FormGroup;

  constructor () {
    this.loginForm= new FormGroup({
      email: new FormControl("",[Validators.required,Validators.pattern(this.regexEmail)]),
      password: new FormControl("",[Validators.required,Validators.pattern(this.regexPasswordCheck)]),
      rememberMe: new FormControl(false)
    })
  }

  get email(){
    return this.loginForm.get("email")!;
  }

  get password() {
    return this.loginForm.get("password")!;
  }

  get rememberMe() {
    return this.loginForm.get("rememberMe")!;
  }

  onSubmit(){
    if (this.loginForm.invalid) return;
    const loginClear:Ilogin= {
      email: this.email.value.trim().toLowerCase(),
      password: this.password.value.trim(),
      rememberMe: this.rememberMe.value
    };
    this.authServices.login(loginClear);

  }



}
