import jwt from "jsonwebtoken";
import configKeys from "../config";
import { Response } from "express";

const generateToken = (res:Response,userId: string)=>{
    const token = jwt.sign({userId},configKeys.JWT_SECRET,{
        expiresIn: '3d'
    });
    
    
    res.cookie('jwt',token,{
        httpOnly:true,
        sameSite:'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000
    });
    
    return token
}

export default generateToken;