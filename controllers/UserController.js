
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.userRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(401).json({
                message : "All Fields are required!",
                success : false
            });
        }

        const Email = await User.findOne({email});

        if(Email){
            return res.status(401).json({
                message : "User already with this email",
                success : false
            });
        }

        const hashPass = await bcrypt.hash(password, 10);
         await User.create({
            name,
            email,
            password : hashPass
         });

         return res.status(200).json({
            message : "Account created successfully",
            success : true
        });
    } catch (error) {
        return res.status(400).json({
            message : "Error is creating account",
            success : false
        }); 
    }
}

exports.Login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                message : "All Fields are required!",
                success : false
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message : "Invalid email or password",
                success : false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Await the bcrypt.compare function

        if(!isMatch){
            return res.status(401).json({
                message : "Invalid email or password",
                success : false
            });
        }

        const token = jwt.sign({ userId: user._id }, "spdowper9e0w9q-r9ifsp", { expiresIn: "1d" }); // Pass an object to jwt.sign instead of a string

        // Set the token as a cookie in the response
        res.cookie("token", token, { httpOnly: true, maxAge: 86400000 }); // 1 day in milliseconds

        return res.status(200).json({
            message : `Welcome back ${user.name}`,
            success : true,
            token,
            user
        });
    } catch (error) {
        console.log("Error in logging:", error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        });
    }
}

exports.Logout = async (req, res) => {
   
        return res.status(200).cookie("token", "", {expiresIn : new Date(Date.now())}, {httpOnly : true}).json({
            message : "User Logged Out Sucessfully",
            success : true
        })
   
}