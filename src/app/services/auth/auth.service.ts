import { Injectable } from '@angular/core';
import { Ilogin, Iregister } from '../../models/generic-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  private logIn:boolean = true;

  isLogging():boolean {
    return this.logIn
  }

  logOut():void {
    this.logIn = false;
  }

  //logica di interrogazione col DB per vedere se l'account esiste e convalidarlo.
  login(login:Ilogin):void {
    console.log(login);
  }

  register(register:Iregister):void {
    console.log(register)
  }
  
}
