const express=require('express');
const app = express();
const mongoose =require('mongoose');
const bodyParser=require('body-parser');

require('dotenv/config');

//import resources
const booksRoute=require('./routes/books');
app.use(bodyParser.json());


//middlewares
app.use('/books',booksRoute);

//Routes
app.get('/',(req,res)=>{
    res.send('we are on');

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