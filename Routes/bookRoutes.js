const { AuthenticateJWT } = require("../middlewares/auth");
const express = require("express");
const Book = require("../Models/book");
const bookRouter = express.Router();


bookRouter.get("/books", async (req, res) => {

    try {

        const books = await Book.find();
        res.status(200).send(books)


    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Invalid Server Error" });
    }

})

bookRouter.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(401).send({ msg: "Book not Found" })
        }
        res.status(200).send(book);

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Invalid Server Error" });
    }
})

bookRouter.get("/books", async (req, res) => {
    try {
        const { category } = req.query;
        const books = await Book.find({ category });
        res.status(200).send({ books });



    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Invalid Server Error" });
    }
})

bookRouter.get("/books", async (req, res) => {
    try {

        const { author, category } = req.query;
        const books = await Book.find({ author, category });
        res.status(200).send({ books })


    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Invalid Server Error" });
    }
})

bookRouter.post("/books",AuthenticateJWT, async (req, res) => {
    try {
        const { title, author, category, price, quantity } = req.body;
console.log(req.user);
        if (!req.user.isAdmin) {
            return res.status(403).send({ msg: "Forbidden",msg:"isAdmin False" });
        }

        const book= new Book({
            title,author,category,price,quantity
        })

        await book.save();
        res.status(201).send({msg:"Book added SuccessFully"});




    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Invalid Server Error" });
    }
})


bookRouter.put("/books/:id",AuthenticateJWT,async(req,res)=>{
    try {
        const { title, author, category, price, quantity } = req.body;
        if (!req.user.isAdmin) {
            return res.status(403).send({ msg: "Forbidden" });
        }

        const book= await Book.findById(req.params.id);
        if(!book){
            return res.status(404).send({"msg":"Book Not found"})
        }

        book.title=title;
        book.author=author;
        book.category=category;
        book.price=price;
        book.quantity=quantity;

        await book.save();
        res.status(204).send({msg:"Update Done, from Book ID"})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Internal Server Error"})
    }
})


bookRouter.delete("/books/:id",AuthenticateJWT,async(req,res)=>{
    try {
        if (!req.user.isAdmin) {
            return res.status(403).send({ msg: "Forbidden" });
        }

        const book= await Book.findByIdAndRemove(req.params.id);
        if(!book){
            return res.status(404).send({msg:"Book Not Found"})
        }


        
        res.status(202).send({msg:"Book Deleted Successfully"});

        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Internal Server Error"})
    }
})

module.exports=bookRouter;