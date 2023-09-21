const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../Models/user");
const jwt_secret_key = process.env.jwt_secret_key || "MasaiSchool";
const router = express.Router()

router.post("/register", async (req, res) => {
    try {

        const { name, email, password,isAdmin } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({ msg: "Email already existed" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name, email, password: hashedPassword,isAdmin
        })

        await user.save();
        res.status(201).send({ msg: "User Registered Successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error During Signup" })
    }
})

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send({ msg: "Invalid Email Address" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).send({ msg: "Invalid Password" })
        }

        const token = jwt.sign({ userId: user._id },jwt_secret_key)

        res.status(201).send({token,msg:"Login Successful"});

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error During Login" })
    }
})



module.exports = router;