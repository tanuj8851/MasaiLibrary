const mongoose= require("mongoose")

const orderSchema= mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true },
    books : [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    totalAmount:{
        type:Number,
        required:true
    }
});

const Order= mongoose.model("Order",orderSchema)

module.exports=Order;