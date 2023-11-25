import { Injectable } from "@angular/core";
import { switchMap, catchError, map, tap } from "rxjs";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../services/auth-service.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
    loginSucess,
    loginFailure,
    loginRequest,
    signupRequest,
    signupSuccess,
    signupFailure
} from "./login.action";

@Injectable()

export class AuthEffects {

    constructor(private actions$: Actions,
        private userService: AuthServiceService,
        private router: Router) { }


    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginRequest),
            switchMap(({ credentials }) =>
                this.userService.login(credentials).pipe(
                    map(res => {
                        let response: any = res;
                        if(response){
                            localStorage.setItem('user-token',response.token)                            
                            return loginSucess({userToken : response.token})
                        }
                        else {
                            console.log('in side effect LE', response);
                            return loginFailure({ error: response.error.error })
                        }
                    }),
                    catchError(error => of(loginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginSucess),
            tap(( )=>{
                this.router.navigate(['/']);  
            })
        ), {
            dispatch : false
        }
    );

    loginFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginFailure),
            tap(()=>{
                console.log('error');
                
                this.router.navigate(['/auth/login'])
            })
        ), {
            dispatch: false
        }
    );

    // signup

    signup$ = createEffect(()=>
        this.actions$.pipe(
            ofType(signupRequest),
            switchMap(({ user }) =>
                this.userService.signup(user).pipe(
                    map(res=>{
                        let response : any = res;
                        if(response){
                            localStorage.setItem('user-token',response.token)
                            return signupSuccess({userData : response})
                        }else{
                            return signupFailure({ error : response.error.error  })
                        }
                    }),
                    catchError(error => of (signupFailure({ error })))
                )
            )
        )
    );

    signupSuccess$ = createEffect(()=>
    this.actions$.pipe(
        ofType(signupSuccess),
        tap(()=>{
            this.router.navigate(['/']);
        })
    ), {
        dispatch : false
    }
);

signupFailure$ = createEffect(()=>
    this.actions$.pipe(
        ofType(loginFailure),
        tap(()=>{
            this.router.navigate(['/auth/signup'])
        })
    ), {
        dispatch: false
    }
);
}










