import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/loginState/login.reducer';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { AuthEffects } from './state/loginState/login.effects';

@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    AuthComponent,
    SignupComponent,
    ServiceListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('user', authReducer),
    EffectsModule.forFeature(AuthEffects),
  ]
})
export class UserModule { }
