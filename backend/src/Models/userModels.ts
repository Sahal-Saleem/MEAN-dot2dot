import mongoose from "mongoose";
import { Document, Schema, model } from 'mongoose';
import bcrypt from "bcrypt"
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user?: User; // Adjust the type according to your User model
  }

interface User extends Document {
    _id?: string;
    name: string;
    email: string;
    phone: number;
    password: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
  }


const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

userSchema.pre('save',async function (next){
if(!this.isModified('password')){
    next()
}

const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword:string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model('User',userSchema);

export default User;