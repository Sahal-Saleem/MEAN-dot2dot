import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {

userData: any;
 
constructor(private userService : AuthServiceService,  private router : Router){}

  isLoggedIn(): boolean {
    if(this.userService.getToken())
      return true
    else return false
  }

  logout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('')
  }

}
