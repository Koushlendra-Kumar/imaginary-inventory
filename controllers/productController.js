const Product = require('../models/product');
const Category = require('../models/category');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.product_list = function(req, res, next) {
    Product.find()
        .sort([['name', 'ascending']])
        .exec(function(err, list_product) {
            if(err) {return next(err);}
            res.render('product_list', {title: 'Modern House', list_product: list_product});
        });
};