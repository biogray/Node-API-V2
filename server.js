
console.log('is this thing on?')



//adds everthing from .env to process.env
require('dotenv').config(); 

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');



var uri = process.env.DB_CONNECTION;
const FRONTEND = process.env.FRONTEND.split(",").map(item => item.trim()) || '';

const Product = require('./models/productModel');
const ProductRoute = require('./routes/productRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
var cors = require('cors');

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/products', ProductRoute);

// app.use(middleware1);
// app.use(middleware2);





//routes
//app.get('/' , middleware3, (req, res, next) => {
app.get('/' ,  (req, res, next) => {
       console.log('I am standard express function app.get/   Custom property: ', req.customProperty)      
       res.send(`Hello from API  req: ${req.customProperty}`)
       //throw new Error('fake error')
} )

app.get('/blog' , (req, res) => {
       res.send('Hello from API blog res',   res.status(status).send(body) )
       //res.status(status).send(body) 
} )






mongoose.set("strictQuery", false);
 

// app.use(errorMiddleware2);
// app.use( errorMiddleware);

function middleware1( req, res, next) {
  console.log('hello from middleware 1')
  //res.send( '<h1>Hello from middleware 1 </h1>')
  const errorObj =  new Error('fake error from mid2')
  req.customProperty=100;
  next();
}
function middleware2( req, res, next) {
  console.log('hello from middleware 2')
  console.log('customProperty: ', req.customProperty);
 // res.send( '<h1>Hello from middleware 2 </h1>');
 next();
}

function middleware3( req, res, next) {
  console.log('hello from middleware 3')
  req.customProperty=300;
  console.log('customProperty: ', req.customProperty);
 // res.send( '<h1>Hello from middleware 3 </h1>')
 next();
}

function errorMiddleware2 ( err, req, res, next ) {
  err.status = 500;
  console.log('das error: ', err.message);
  console.log('das error status: ', err.status);
  next(err);
}



// ATLAS ATLAS ATLAS ATLAS ATLAS ATLAS ATLAS ATLAS ATLAS ATLAS

// mongoose.connect(uri, 
//        {useNewUrlParser: true,
//         uri_decode_auth: true},
//        ()=> {console.log('connected to mongodb')}
// );



// connect to ATLAS
mongoose.connect(uri , {useNewUrlParser: true})
.then( () => {
  console.log('connected to MongoDB');
}).then( () => {
  app.listen( process.env.PORT || 3000 , ()=> {
  console.log(`Node API is running its own port ${process.env.PORT}`);

} )
})
.catch( (error) => {
  console.log('Connection error: ',error)
})



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
//run().catch(console.dir);