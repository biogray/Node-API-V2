
console.log('hello from Node')
//timestamp https://youtu.be/9OfL9H6AmhQ?feature=shared&t=1021
//https://www.youtube.com/watch?v=v_pcW65DGu8
// custom middleware time 20:50
// asyncHandler  for throwing errors  31:33
// CORS 33:54
// upload your code to github, then deploy to Render.com   @40:51



//adds everthing from .env to process.env
require('dotenv').config(); 

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');



const uri = process.env.DB_CONNECTION;
const FRONTEND = process.env.FRONTEND;

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




//routes
app.get('/' , (req, res) => {
       res.send('Hello from API')
       //throw new Error('fake error')
} )

app.get('/blog' , (req, res) => {
       res.send('Hello from API blog res',   res.status(status).send(body) )
       //res.status(status).send(body) 
} )


app.use( errorMiddleware);

mongoose.set("strictQuery", false);
 


// mongoose.connect(uri, 
//        {useNewUrlParser: true},
//        ()=> {console.log('connected to mongodb')}
// );


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
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

