import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordMatch } from './validators/password-match';
import { Iregister } from '../../models/generic-interfaces';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private authServices = inject(AuthService);
  private router = inject(Router);


  registerForm:FormGroup;
  regexName:RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?:\s[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:\.)?)?$/;
  regexEmail:RegExp = /^[a-zA-Z0-9._%+-]+(\.[a-zA-Z0-9._%+-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  regexPhone:RegExp = /^(?:\+?\d{1,4}\s?\d{7,10})$/;
  regexCountry:RegExp = /^[a-zA-Z\s]{2,50}$/;
  regexPasswordCreate:RegExp = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~`|=-])(?=.*[A-Z])(?!.*\s).{8,16}$/;

  constructor(){
    this.registerForm = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.pattern(this.regexName)]),
      lastName:new FormControl("",[Validators.required,Validators.pattern(this.regexName)]),
      email: new FormControl("",[Validators.required,Validators.pattern(this.regexEmail)]),
      phone: new FormControl("",[Validators.required,Validators.pattern(this.regexPhone)]),
      country: new FormControl("",[Validators.required,Validators.pattern(this.regexCountry)]),
      birthDate: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required,Validators.pattern(this.regexPasswordCreate)]),
      passwordCheck: new FormControl("",[Validators.required,Validators.pattern(this.regexPasswordCreate), passwordMatch("password")]),
      privacyCheck: new FormControl(false,[Validators.requiredTrue])


    });
  }

  get name(){
    return this.registerForm.get("name")!;
  }

  get lastName(){
    return this.registerForm.get("lastName")!;
  }

  get email(){
    return this.registerForm.get("email")!;
  }

  get phone(){
    return this.registerForm.get("phone")!;
  }

  get country(){
    return this.registerForm.get("country")!;
  }

  get birthDate(){
    return this.registerForm.get("birthDate")!;
  }

  get password(){
    return this.registerForm.get("password")!;
  }

  get passwordCheck(){
    return this.registerForm.get("passwordCheck")!;
  }

  get privacyCheck(){
    return this.registerForm.get("privacyCheck")!;
  }

  onSubmit(){
    if(this.registerForm.invalid || this.password.value !== this.passwordCheck.value) {
      this.registerForm.markAllAsTouched(); 
      return;
    }

    const registerObj:Iregister = {
      name:this.firstUpperCase(this.name.value),
      lastName:this.firstUpperCase(this.lastName.value),
      email:this.email.value.trim().toLowerCase(),
      phone:this.email.value.trim(),
      country:this.country.value.trim(),
      birthDate:this.birthDate.value,
      password:this.password.value.trim(),
      passwordCheck:this.passwordCheck.value.trim()
    }

    this.authServices.register(registerObj);
    if (true) this.router.navigate(['/login']); // nel controllo inserire il checkdi avvenuta registrazione
  }

  private firstUpperCase(input:string):string{

    const text:string = input.trim();
    return text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
    
  }
}
