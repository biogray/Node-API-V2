const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
       {
              name: {
                     type: String,
                     required: [true, "Please enter your name"]
              },
              quantity: {
                     type: Number,
                     required: true,
                     default: 0
              },
              price: {
                     type: Number,
                     required: true,
                     default: 0
              },
              image: {
                     type: String,
                     required: false
              },
            
              time : { type : Date, default: Date.now },

       },
       {timestamps: true},
       { collection: 'soils' }
);

//creating a model to export  time: 25:00
// third parameter is collection name
const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;