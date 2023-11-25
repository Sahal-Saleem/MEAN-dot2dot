import { Request, Response, NextFunction } from "express";

const notFound = (req:Request,res:Response,next:NextFunction)=>{
const error = new Error(`not found - ${req.originalUrl}`);
res.status(404);
next(error);
}

const errorHandler = (err:Error, req:Request,res:Response,next:NextFunction)=>{
let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
let message = err.message;

// in mongoose, to check cast error
if(err.name === 'CastError'){
    statusCode = 404;
    message = 'Resorce not found';
}

res.status(statusCode).json({
message
})
}

export{
    notFound,
    errorHandler
}

