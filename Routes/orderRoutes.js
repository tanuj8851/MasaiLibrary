const express = require("express")
const Order = require("../Models/order");
const { AuthenticateJWT } = require("../middlewares/auth")
const router = express.Router()

router.post("/order", AuthenticateJWT, async (req, res) => {
    try {

        const { books, totalAmount } = req.body;
        const order = new Order({
            user: req.user.userId,
            books,
            totalAmount
        });
        await order.save()

        res.status(201).send({ msg: "Order Placed Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Internal Server Error" })
    }
})

router.get("/order",AuthenticateJWT,async(req,res)=>{
try {

    if(!req.user.isAdmin){
        return res.status(403).send({msg:"Forbidden",error:"isAdmin error"})

    }

    const orders= await Order.find().populate("User Books");
    res.status(200).send(orders);
} catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Internal Server Error" })
}
})

module.exports=router;