import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
//import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
 const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        fullName: {
            type: String,
            required: true,
            trim:true,
            index: true
        },
        avatar: {
           type: String, // cloudinary url 
           required: true,
         },
         coverImage:{
            type: String, // cloudinary url 
         },
         watchHistory:[
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Video'
                },
         ],
         password: {
            type: String,
            required: [true, 'Please provide a password'],
         },
         refreshToken: {
            type: String,
            required: false,
         },
     }, 
     {
        timestamps:true
    }
)

userSchema.pre('save', async function(next) {
if(!this.isModified('password'))  return next(); 

this.password =  await bcrypt.hash(this.password, 10);
   
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
     return jwt.sign(
        { 
        id: this._id , 
        email: this.email,
        username: this.username,
        fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            id: this._id , 
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
    
        );
    };
    
export const User = mongoose.model('User', userSchema);

