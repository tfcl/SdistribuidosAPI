const express=require('express');
const app = express();
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
require('dotenv/config');

//import resources
const booksRoute=require('./routes/books');
app.use(bodyParser.json());
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

//middlewares
app.use('/books',booksRoute);
app.get('/favico.ico', (req, res) => {
    res.sendStatus(404);
});
//Routes
app.get('/',(req,res)=>{
    res.render('we are on');

});
//Connect ro db
mongoose.connect(
    process.env.DB_CONNECTION,
    { 



        useNewUrlParser: true,
        useUnifiedTopology: true
    
    
    }
).then(()=>{
    () => console.log('connected Kurwa!')

});





// how do we start listening to the server
app.listen(process.env.PORT || 5000);