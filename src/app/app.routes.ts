import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
{ path: "" , redirectTo: "/home", pathMatch: "full"},
{ path:"home", component:HomeComponent, canActivate:[ authGuard]},
{ path:"login", component:LoginComponent},
{ path:"register", component:RegisterComponent},
{ path: '**', component:LoginComponent}
];

