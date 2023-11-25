import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../types/User';
import { Store } from '@ngrx/store';
import { UserState } from '../../../state/user.state';
import { signupRequest } from '../../../state/loginState/login.action';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private store: Store<UserState>){}



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$")]),
      phone: new FormControl(null, [Validators.required, Validators.pattern("[6-9]\\d{9}")]),
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
      password : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    })
    console.log(this.form);
    
  }

  onFormSubmit(){
    const user:User ={
      name: this.form.value.name,
      phone: this.form.value.phone,
      email: this.form.value.email,
      password: this.form.value.password
    } 

    this.store.dispatch(signupRequest({user}))
  }
 




}
