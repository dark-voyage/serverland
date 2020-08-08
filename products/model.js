const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    _id: {
        type:Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const ProductSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: {
        type: [CategorySchema],
        required: false
    },
    sizes: {
        type: [Number],
        required: false
    },
    preview: {
        type: [Buffer],
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
