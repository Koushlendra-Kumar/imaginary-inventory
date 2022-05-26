var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
       name: String,
       description: String, 
    }
);

CategorySchema
    .virtual('url')
    .get(function() {
        return '/'+this._id;
    });
    
module.exports = mongoose.model('Category', CategorySchema);