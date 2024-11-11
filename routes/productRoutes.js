const express = require('express');
const { getAllProducts, getIdProduct, postNewProduct, putIdProduct, deleteIdProduct } = require('../controllers/productController');
const router = express.Router();
const Product = require('../models/productModel');


//router.get  ->  router.get

router.get('/', getAllProducts);
     
     
router.get('/:id', getIdProduct)
     
     
     
     //adding a new product from req.body
     router.post('/',  postNewProduct )
     
     //updating a product from req.body,  time 37   time 41:41
     router.put('/:id', putIdProduct)
     
     
     //delete a product
     router.delete('/:id', deleteIdProduct)
     
     

     module.exports = router;