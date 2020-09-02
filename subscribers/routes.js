module.exports = async (app) => {
  const subscribers = require("./controller.js");

  // Create a new subscriber
  await app.post("/subscriber", subscribers.create);

  // Retrieve all subscribers
  await app.get("/subscriber", subscribers.findAll);

  // Retrieve a single subscriber with subId
  await app.get("/subscriber/:subId", subscribers.findOne);

  // Delete a subscriber with subId
  await app.delete("/subscriber/:subId", subscribers.delete);
};
