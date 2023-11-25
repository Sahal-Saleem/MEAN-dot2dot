import express,{ Application } from "express";
import configKeys from "../../config"
import cors from 'cors'

const configExpress = (app:Application)=>{
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:configKeys.ORIGIN_PORT}))
}

export default configExpress;