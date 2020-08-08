module.exports = async (app) => {
    const products = require('./controller.js');

    // Create a new Products
    await app.post('/products', products.create);

    // Retrieve all Products
    await app.get('/products', products.findAll);

    // Retrieve a single Product with productId
    await app.get('/products/:productId', products.findOne);

    // Update a Product with productId
    await app.put('/products/:productId', products.update);

    // Delete a Product with productId
    await app.delete('/products/:productId', products.delete);
}
