import { Action, createReducer, on } from "@ngrx/store";
import { loginSucess, loginFailure, signupRequest, signupSuccess } from "./login.action";
import { UserState } from "../user.state";

export const initialState: UserState = {
    UserToken: "",
    errorMessage: undefined
}

const _authReducer = createReducer(
    initialState,
    on(loginSucess,(state, {userToken})=>{
        
        return {
            ...state,
            UserToken : userToken,
            errorMessage: undefined
        }
    }),
 
 on(loginFailure,(state, {error})=>{
    console.log(error.error.message);
    
    return {
        ...state,
        user:"",
        errorMessage: error.error.message
    }
 }),
 on(signupSuccess,(state,{userData})=>{
    console.log(userData);
    
    return {
        ...state,
        userData,
        errorMessage: undefined
    }
 })
 )

 export function authReducer(state: UserState = initialState, action: Action){
    return _authReducer(state,action)
}