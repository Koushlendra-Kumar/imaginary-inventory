var express = require('express');
var router = express.Router();
var category_controller = require('../controllers/categoryController');
var product_controller = require('../controllers/productController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Modern House' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Modern House' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Modern House' });
});

router.get('/categories', category_controller.category_list);

router.get('/products', product_controller.product_list);
module.exports = router;
