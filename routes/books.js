const { Router } = require('express');
const express =require('express');
const router = express.Router();
const Book =require('../models/Book');

//gets all the books
router.get('', async(req,res)=>{
    try{
        const books=await Book.find();
        res.json(books)

    }catch(err){
        res.json({message:err});

    }
    

});


//submits a book
router.post('/',async (req,res)=>{
    const book=new Book({
        title:req.body.title,
        isAvailable:req.body.isAvailable,
        isbn:req.body.isbn

        
    });
    try{
    const savedBook= await book.save();
    res.json(savedBook);
    }catch(err){
        res.json({message:err});
    }
});


//get specicfic book

router.get('/:bookId', async(req,res)=>{ 
    try{
    const book = await Book.findById(req.params.bookId);
    res.json(book)
    }catch(err){
        res.json({message:err});

    }

});


//Delete Post
router.delete('/:bookId', async(req,res)=>{
    try{
    const removedBook= await Book.remove({_id: req.params.bookId});
    res.json(removedBook);
    }catch(err){
        res.json({message:err});


    }

});

//Update a book
router.patch('/:bookId', async(req,res)=>{
    try{
    const updatedBook= await Book.updateOne(
        {_id: req.params.bookId}, 
        {$set: {title: req.body.title}}
        
    );
    res.json(updatedBook);
    }catch(err){
        res.json({message:err});


    }

});

//get avalable books
router.get('/available/:param', async(req,res)=>{
    try{
    const books= await Book.find({isAvailable:req.params.param});
    console.log(books);       

    res.json(books);
    }catch(err){
        res.json({message:err});


    }

});

module.exports = router;