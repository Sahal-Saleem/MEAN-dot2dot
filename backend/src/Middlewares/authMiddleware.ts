import jwt from "jsonwebtoken"
import User from "../Models/userModels"
import { Request, Response, NextFunction } from 'express';
import configKeys from "../config";

const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded: any = jwt.verify(token, configKeys.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');
      
      next();
    } catch (error) {
        res.status(401)
      // Instead of directly throwing the error, pass it to the next middleware
      next(new Error('not authorized, invalid token'));
    }
  } else {
    res.status(401)
    // Instead of directly throwing the error, pass it to the next middleware
    next(new Error('not authorized, no token'));
  }
};

export { protect };



