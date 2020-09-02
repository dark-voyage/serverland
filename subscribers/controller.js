/**
 * @name Subscriber Controller
 * @description Controller host of Subscribers base
 */

const Subscriber = require("./model.js");

// Create and Save a new Subscriber
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.id) {
    return res.status(400).send({
      message: "Subscriber must have id!",
    });
  }

  const checker = await Subscriber.exists({ id: req.body.id });
  if (checker) {
    return res.status(409).send({
      message: "Subscriber is already subscribed",
    });
  } else {
    // Create a Subscriber
    const subscriber = new Subscriber({
      id: req.body.id,
    });

    // Save Subscriber in the database
    await subscriber
      .save()
      .then((data) => {
        res.send({
          status: "success",
          member: data.id,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while subscribing.",
        });
      });
  }
};

// Retrieve and return all Subscribers from the database.
exports.findAll = async (req, res) => {
  await Subscriber.find()
    .then(async (subscriber) => {
      let result = await Object.values(
        subscriber.map(function (obj) {
          return obj["id"];
        })
      );

      res.json(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subscribers.",
      });
    });
};

// Find a single subscriber with a subId
exports.findOne = async (req, res) => {
  await Subscriber.findOne({ id: req.params.subId })
    .then((subscriber) => {
      if (!subscriber) {
        return res.status(200).send({
          registered: false,
        });
      }
      res.send({
        registered: true,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Subscriber not found with id " + req.params.subId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving subscriber with id " + req.params.subId,
      });
    });
};

// Delete a Subscriber with the specified subId in the request
exports.delete = async (req, res) => {
  await Subscriber.findOneAndRemove(req.params.subId)
    .then((Subscriber) => {
      if (!Subscriber) {
        return res.status(404).send({
          message: "Subscriber not found with id " + req.params.subId,
        });
      }
      res.send({ message: "Subscriber deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Subscriber not found with id " + req.params.subId,
        });
      }
      return res.status(500).send({
        message: "Could not delete subscriber with id " + req.params.subId,
      });
    });
};
