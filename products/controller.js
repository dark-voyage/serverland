/**
 * @name Products Controller
 * @description Controller host of posts base
 */

const Product = require('./model.js');

// Create and Save a new Post
exports.create = async (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    // Create a Post
    const product = new Product({
        title: req.body.title || "Untitled Post",
        price: req.body.price || 0.00,
        categories: req.body.categories || [],
        sizes: req.body.sizes || [],
        preview: req.body.preview
    });

    // Save Post in the database
    await product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Post."
        });
    });
};

// Retrieve and return all posts from the database.
exports.findAll = async (req, res) => {
    await Product.find()
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });
};

// Find a single post with a postId
exports.findOne = async (req, res) => {
    await Product.findById(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });            
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving post with id " + req.params.postId
        });
    });
};

// Update a post identified by the postId in the request
exports.update = async (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    // Find post and update it with the request body
    await Product.findByIdAndUpdate(req.params.productId, {
        title: req.body.title || "Untitled Post",
        content: req.body.content
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error updating post with id " + req.params.postId
        });
    });
};

// Delete a post with the specified postId in the request
exports.delete = async (req, res) => {
    await Product.findByIdAndRemove(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        res.send({message: "Post deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Could not delete post with id " + req.params.postId
        });
    });
};
