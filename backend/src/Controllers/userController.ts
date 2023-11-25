import { NextFunction, Request,Response } from 'express'
import User, { AuthenticatedRequest } from '../Models/userModels'
import generateToken from '../Utils/generateToken'

// set token
const authUser = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const{email,password} = req.body;        

        const user = await User.findOne({email});

        if(user && (await user.matchPassword(password) )){
            
             const token = generateToken(res,user._id);             
            // res.header('Authorization', `Bearer ${token}`);

            res.status(201).json({
                _id : user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                token: token 
            });
            
            
        }else{console.log("else");
        
            res.status(401);
            throw new Error('invalid email or password');
        }
    } catch (error) {
        next(error)
    }
}

// register user
const registerUser = async(req:Request,res:Response,next:NextFunction)=>{
try {
    const{name,email,password,phone}= req.body;

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400);
        throw new Error('user already exist')
    }

    const user = await User.create({
        name,
        email,
        phone,
        password
    })

    if(user){
        const token = generateToken(res,user._id);
        res.status(201).json({
            _id : user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: token
        });
    }else{
        res.status(400);
        throw new Error('invalid user data');
    }
} catch (error) {
    next(error)
}
    
}

// logout
const logoutUser = async(req:Request,res:Response)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message:"user logged out"})
}

// get user profile
const getUserProfile = async(req:AuthenticatedRequest,res:Response)=>{
    if (req.user) {
        const user = {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone

        };
        res.status(200).json({ user });
      }
}

// update user profile
const updateUserProfile = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    try {
      const user = await User.findById(req.user?._id);
  
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone
  
        if (req.body.password) {
          user.password = req.body.password;
        }
  
        const updatedUser = await user.save();
        res.status(200).json({ message: 'User profile updated', user: updatedUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
        next(error)
    }
  };

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
    
    
}