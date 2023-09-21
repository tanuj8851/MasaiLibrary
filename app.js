const express = require("express")
const app = express()
require("dotenv").config()
const { db } = require("./Config/db");
const jwt_secret_key = process.env.jwt_secret_key || "MasaiSchool";
const port = process.env.port || 8080;


app.use(express.json())



const userRoutes = require("./Routes/userRoutes");
const bookRoutes= require("./Routes/bookRoutes");
const orderRoutes= require("./Routes/orderRoutes");


app.use("/api", userRoutes);
app.use("/api", bookRoutes);
app.use("/api",orderRoutes);


app.get("/", (req, res) => {
    try {
        res.send({ msg: "HomePage" })
    } catch (error) {
        res.send({ msg: error })
    }
})



app.listen(port, async () => {
    console.log(`App is running on port ${port}`)
    try {
        await db
        console.log("DB Connected")
    } catch (error) {
        console.log("Db Not Connected")
    }
})

