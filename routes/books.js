const { urlencoded } = require('body-parser');
const { Router } = require('express');
const express =require('express');
const router = express.Router();
const Book =require('../models/Book');
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const methodOverride = require('method-override');
//gets all the books
router.get('/', async(req,res)=>{
    try{
        console.log(req.query.id)
        if (req.query.id !== undefined){
            if(req.query.id.length > 0) {
                
                res.redirect("/books/"+req.query.id)
                console.log("entrou");

            }
    }
        console.log("home");
        const books=await Book.find();
        res.render('Index',{books:books})
        //res.json(books)


    }catch(err){
        res.json({message:err});

    }
    

});


//submits a book
router.post('/insert',urlencodedParser,async (req,res)=>{
    console.log(req.body);
    const book=new Book({
        title:req.body.title,
        isAvailable:req.body.isAvailable,
        isbn:req.body.isbn

        
    });
    try{
    const savedBook= await book.save();
    res.redirect("/books")
    }catch(err){
        res.json({message:err});
    }
});
router.get('/edit',async(req,res)=>{
    try{
        console.log(req.query.id);

        
        res.render('edit',{id:req.query.id});
    }catch(err){
        res.json({message:err});

    }
});

//get specicfic book
router.get('/insert',async(req,res)=>{
    try{
        res.render('insert');
    }catch(err){
        res.json({message:err});

    }
});
router.get('/:bookId', async(req,res)=>{ 
    try{

    
    const book = await Book.findById(req.params.bookId);
    res.render('Index1',{book:book})
    }catch(err){
        res.json({message:err});

    }

});

//edit view
//Delete Post
router.delete('/:bookId', async(req,res)=>{
    try{
        const removedBook= await Book.remove({_id: req.params.bookId});
        res.redirect("/books")
    }catch(err){
        res.json({message:err});
        
        
    }
    
});

//Update a book
router.patch('/:bookId',urlencodedParser, async(req,res)=>{
    try{
        const updatedBook= await Book.updateOne(
            {_id: req.params.bookId}, 
            {$set: {title: req.body.title}}
            
            );
            res.redirect("/books")
        }catch(err){
            res.json({message:err});
            
            
        }
        
    });
    
    //get avalable books
    router.get('/available/:param', async(req,res)=>{
        try{
            const books= await Book.find({isAvailable:req.params.param});
            res.render('Index',{books:books})
        }catch(err){
            res.json({message:err});
            
            
        }
        
    });
    

    
    module.exports = router;