import bcryptjs from 'bcryptjs';

import User from "../models/user.model.js";
import generateToken from '../utils/generateToken.js';

export const signup = async(req, res) => {
    try {
        const {fullName,userName, password, confirmPassword, gender } = req.body;
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Password don't Match"})
        }

        const user = await User.findOne({userName});
        if(user) return res.status(400).json({error: "UserName already exists"});

        // hash Password here

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)


        // https://avatar-placeholder.iran.liara.ru - API for profilePic
        
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,

        })
        if(newUser) {
            // Generate JWT token here
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({error: "Invalid user data"});
        }

    

        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }

}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log("User ->", userName, "password-->", password);
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "")
        console.log(isPasswordCorrect);
        console.log(user);
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Inavlid username or password!"});
        }

       await generateToken(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
    
}

export const logout = async(req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully!"})
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}