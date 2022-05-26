var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String},
        category: {type: Schema.Types.ObjectId, ref: 'Category'},
        numberInStock: {type: Number, required: true},
    }
);

ProductSchema
    .virtual('url')
    .get(function () {
        return '/'+this._id;
    });

module.exports = mongoose.model('Product', ProductSchema);