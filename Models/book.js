const mongoose= require("mongoose")

const bookSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:false
    },
    quantity:{
        type:Number,
        default:false
    }

});

const Book= mongoose.model("Book",bookSchema)

module.exports=Book;