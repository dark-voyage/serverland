module.exports = async (app) => {
  const quotes = require("./controller.js");

  // Create a new quote
  await app.post("/quotes", quotes.create);

  // Retrieve all quotes
  await app.get("/quotes", quotes.findAll);

  // Retrieve a single quote with quoteId
  await app.get("/quotes/:quoteId", quotes.findOne);

  // Update a Quote with quoteId
  await app.put("/quotes/:quoteId", quotes.update);

  // Delete a Quote with quoteId
  await app.delete("/quotes/:quoteId", quotes.delete);
};
