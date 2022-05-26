#! /usr/bin/env node

console.log('This script populates some test products and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Product = require('./models/product')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = [];
var categories = [];



function categoryCreate(name, description, cb) {
  var category = new Category({ name: name , description: description});
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New : ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function productCreate(name, price, description, category, numberInStock, cb) {
  productDetail = { 
    name: name,
    price: price,
    description: description,
    category: category,
    numberInStock: numberInStock
  }
  // if (genre != false) bookdetail.genre = genre
    
  var product = new Product(productDetail);    
  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}



function createCategory(cb) {
    async.series([
        function(callback) {
          categoryCreate('Table', 'A table is a low table designed to be placed in a sitting area for convenient support of beverages, remote controls, magazines, books, decorative objects, and other small items.', callback);
        },
        function(callback) {
          categoryCreate('Chair', 'One of the basic pieces of furniture, a chair is a type of seat.', callback);
        },
        function(callback) {
          categoryCreate('Beds', 'A bed is an item of furniture that is used as a place to sleep, rest, and relax.', callback);
        },
        function(callback) {
          categoryCreate('Desks', 'A desk or bureau is a piece of furniture with a flat table-style work surface used in a school, office, home or the like for academic, professional or domestic activities such as reading, writing, or using equipment such as a computer.', callback);
        },
        function(callback) {
          categoryCreate('Cupboards', 'The term cupboard was originally used to describe an open-shelved side table for displaying dishware, more specifically plates, cups and saucers.', callback);
        },
        ],
        // optional callback
        cb);
}


function createProduct(cb) {
    async.parallel([
        function(callback) {
          productCreate('Chair', 200, 'General purpose chair.', categories[1], 10, callback);
        },
        function(callback) {
          productCreate('Table', 1000, 'A coffe table.', categories[0], 4, callback);
        },
        function(callback) {
          productCreate('Cupboard', 2000, 'A storage space for items.', categories[4], 2, callback);
        },
        function(callback) {
          productCreate('Desk', 1500, 'Computer Desk.', categories[3], 1, callback);
        },
        function(callback) {
          productCreate('Bed', 11000, 'Comfortable bed.', categories[2], 5, callback);
        },
        function(callback) {
          productCreate('Sofa Chair',500, 'A sofa chair.', categories[1], 11, callback);
        },
        function(callback) {
          productCreate('Four-poster bed', 20000, 'A bed with four vertical columns.', categories[2], 3, callback);
        },
        function(callback) {
          productCreate('Study Desk', 2000, 'A study desk.', categories[3], 2, callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createCategory,
    createProduct
],
// Optional callback
function (err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+categories);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
