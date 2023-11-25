import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../../types/credentials';
import { Store, select } from '@ngrx/store';
import { UserState } from '../../../state/user.state';
import { loginRequest } from '../../../state/loginState/login.action';
import { selectErrorMessage } from '../../../state/loginState/login.selector';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
form !: FormGroup;
errorMessage: any = ""

constructor(private formBuilder:FormBuilder,
  private store: Store<UserState>
  ){

}

ngOnInit() {
  this.form = this.formBuilder.group({
    email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
    password : new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)])

  })
  
}

onFormSubmit(){
    const credentials : Credentials= {
      email : this.form.value.email,
      password: this.form.value.password
    }
    console.log(credentials);
    

    this.store.dispatch(loginRequest({credentials}))

    this.store.pipe(select(selectErrorMessage)).subscribe((error) => {
      
      this.errorMessage = error  
    });
    
}
}
