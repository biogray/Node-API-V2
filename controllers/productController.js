//https://www.youtube.com/watch?v=v_pcW65DGu8   time:11:55

const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler')

const getAllProducts = asyncHandler (async (req, res) => {
       try {
         const products = await Product.find({});
         console.log('hello from controller middleware');
         console.log('products: ',products)
         res.status(200).json( products )
         //res.send('Here is what i found in mongoDb: ', products)
     
       } catch (error) {
         //res.status(500).json({message : error.message})
         res.status(500);
         throw new Error(error.message);
       }
     })

const getIdProduct = asyncHandler( async (req, res) => {
       try {
     
         //const {id} = req.params.id;
         const id = req.params['id'];
         console.log('id find: ',id)
         //res.send('Hello req.id ', id)
         
         const product = await Product.findById( id);
         if(!product) {
          res.status(404);
          throw new Error(`can't find any product with ID ${id}`);
          }
         res.status(200).json (  product )  ;
      
     
       } catch (error) {
         //res.status(500).json( { message : error.message})
         res.status(500);
         throw new Error(error.message);
       }
     });


const postNewProduct = asyncHandler (async (req, res) => {
       // res.send(req.body);
       // console.log('post reg.body: ', req.body);
       
       try {
         const product = await Product.create(req.body);
         res.status(200).json( product  );
       
       } catch (error) {
         console.log('error: ',error.message);
         //res.status(500).json({message: error.message})
         res.status(500);
         throw new Error(error.message);
       }
     })

//update product
const putIdProduct = asyncHandler (async (req, res) => {
     
       try {
         const id = req.params['id']
         console.log('PUT id: ', id)
         console.log('req.body: ', req.body)
         const product = await Product.findByIdAndUpdate(id, req.body);
         if(!product) {
         res.status(404);
         throw new Error(`can't find any product with ID ${id}`);
         }
         const updatedProducts = await Product.findById(id);
         console.log('updatedProducts ',updatedProducts)
         res.status(200).json(updatedProducts);
     
       } catch (error) {
         console.log('error: ', error.message)
         //res.status(500).json({message: error.message})
         res.status(500);
         throw new Error(error.message);
       }
     })



const deleteIdProduct = asyncHandler (async(req, res) => {
       try {
         const {id} = req.params;
         console.log('id to delete: ', id)
         const product = await Product.findByIdAndDelete(id);
         if (!product) {
          res.status(404);
          throw new Error(  `can't find any product with ID:${id}`  );
          //return res.status(404).json({message: `can't find any product with ID:${id}` })
         }
         console.log('product deleted: ', product)
         res.status(200).json(product);
     
       } catch (error) {
         //res.status(500).json({message: error.message})
         res.status(500);
         throw new Error(error.message);
       }
     })


module.exports = {
       getAllProducts,
       getIdProduct,
       postNewProduct,
       putIdProduct,
       deleteIdProduct
};