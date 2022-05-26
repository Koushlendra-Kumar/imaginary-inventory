const Product = require('../models/product');
const Category = require('../models/category');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.category_list = function( req, res, next) {
    Category.find()
        .sort([['name', 'ascending']])
        .exec(function(err, list_category) {
            if(err) {return next(err);}
            res.render('category_list', {title: 'Modern House', list_category: list_category});
        });
};