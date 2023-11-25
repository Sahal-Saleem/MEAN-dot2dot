import { Injectable } from '@angular/core';
import { environment } from 'src/Environment/environment';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../types/credentials';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http : HttpClient) { }

  server = environment.serverUrl

  setToken(token: string){
    return window.localStorage.setItem('user-token',token);
  }

  getToken(){
    return window.localStorage.getItem('user-token');
  }
  deleteToken(){
    return window.localStorage.removeItem('user-token')
  }

  login(credentials: Credentials){
    return this.http.post(`${this.server}/users/auth`,credentials);
  }

  signup(user:User){
    return this.http.post(`${this.server}/users/register`, user)
  }


}
