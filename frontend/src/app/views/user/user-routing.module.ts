import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'auth', component:AuthComponent,children:[
   { path:'login',component:LoginComponent},
   {path:'signup',component:SignupComponent}
  ]},
  {path:'service-list', component:ServiceListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
