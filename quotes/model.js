const mongoose = require("mongoose");

const QuoteSchema = mongoose.Schema(
  {
    title: String,
    author: { type: String, default: "Genemator Sakhib" },
    snippet: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quote", QuoteSchema);
