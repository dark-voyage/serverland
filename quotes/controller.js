/**
 * @name Quote Controller
 * @description Controller host of Quotes base
 */

const Quote = require('./model.js');

// Create and Save a new Quote
exports.create = async (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Quote content can not be empty"
        });
    }

    // Create a Quote
    const quote = new Quote({
        title: req.body.title || "Untitled Quote",
        author: req.body.author || "Genemator Sakhib",
        snippet: req.body.snippet || "No description provided...",
        content: req.body.content
    });

    // Save Quote in the database
    await quote.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Quote."
        });
    });
};

// Retrieve and return all Quotes from the database.
exports.findAll = async (req, res) => {
    await Quote.find()
    .then(quote => {
        res.send(quote);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Quotes."
        });
    });
};

// Find a single Quote with a QuoteId
exports.findOne = async (req, res) => {
    await Quote.findById(req.params.quoteId)
    .then(quote => {
        if(!quote) {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });            
        }
        res.send(quote);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Quote with id " + req.params.quoteId
        });
    });
};

// Update a Quote identified by the QuoteId in the request
exports.update = async (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Quote content can not be empty"
        });
    }

    // Find Quote and update it with the request body
    await Quote.findByIdAndUpdate(req.params.quoteId, {
        title: req.body.title || "Untitled Quote",
        author: req.body.author || "Genemator Sakhib",
        snippet: req.body.snippet || "No description provided...",
        content: req.body.content
    }, {new: true})
    .then(quote => {
        if(!quote) {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });
        }
        res.send(quote);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });                
        }
        return res.status(500).send({
            message: "Error updating Quote with id " + req.params.quoteId
        });
    });
};

// Delete a Quote with the specified QuoteId in the request
exports.delete = async (req, res) => {
    await Quote.findByIdAndRemove(req.params.quoteId)
    .then(Quote => {
        if(!Quote) {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });
        }
        res.send({message: "Quote deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Quote with id " + req.params.quoteId
        });
    });
};
