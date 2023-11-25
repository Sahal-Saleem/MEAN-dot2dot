import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { ViewsComponent } from './views/views.component';

const routes: Routes = [
  {path:'',component:UserComponent,
  loadChildren: () => import('./views/user/user-routing.module').then(m => m.UserRoutingModule),}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
