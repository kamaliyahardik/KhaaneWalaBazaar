import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";


export const signUp=async(req,res)=>{
    try{
        const {fullName,email,password,mobile,role}=req.body;
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists."});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long."});
        }
        if(mobile.length<10){
            return res.status(400).json({message:"Mobile number must be 10 digits long."});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        user=await User.create({
            fullName,
            email,
            role,
            mobile,
            password:hashedPassword
        });

        const token=await genToken(user._id);
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
    });

        res.status(201).json({
            message:"User registered successfully.",
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                role:user.role,
                mobile:user.mobile
            },
            token
        });

}

    catch(error){
        res.status(500).json({message:"Sign up failed",error:error.message });
    }   
};


export const signIn=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist."});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"incorrect password."});
        }

        const token=await genToken(user._id);
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
    });

        res.status(200).json({
            message:"User registered successfully.",
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                role:user.role,
                mobile:user.mobile
            },
            token
        });

}

    catch(error){
        res.status(500).json({message:"Sign In failed",error:error.message });
    }   
};


export const signOut=async (req,res) =>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"Log out successful"});
    } catch (error) {
        return res.status(500).json({message:"Log out failed",error:error.message });
    }
}
