const express= require("express")
const jwt= require("jsonwebtoken")
require("dotenv").config();
const User = require("../Models/user");

const jwt_secret_key = process.env.jwt_secret_key || "MasaiSchool";

const AuthenticateJWT= async(req, res, next)=> {

    const token = req.header("Authorization");
  
    if (!token) return res.status(401).send({ msg: "Unauthorized" });

    jwt.verify(token, jwt_secret_key,async (err, decodedToken) => {
        if (err) return res.status(401).send({ msg: "Forbidden",error:err })
       try {
        const user= await User.findById(decodedToken.userId)
        if(!user){
            return res.status(404).send({msg:"User not Found"})
        }
        req.user=user;
        next();
       } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Internal Serve Error"})
       }
       
       
    })

}

module.exports={AuthenticateJWT}