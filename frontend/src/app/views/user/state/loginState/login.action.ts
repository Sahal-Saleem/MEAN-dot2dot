import { createAction,props } from "@ngrx/store";
import { Credentials } from "../../types/credentials";
import { User } from "../../types/User";

export const loginRequest = createAction(
    `Auth login request`,
    props<{credentials:Credentials}>()
)

export const loginSucess = createAction(
    `Auth login success`,
    props<{userToken:any}>()
)

export const loginFailure = createAction(
    `Auth login failure`,
    props<{error:any}>()
)


// signup

export const signupRequest = createAction(
    `Auth signup request`,
    props<{user:User}>()
)

export const signupSuccess = createAction(
    `Auth Signup Success`,
    props<{userData: any}>()
)

export const signupFailure = createAction(
    `Auth signup failure`,
    props<{error :any}>()
)