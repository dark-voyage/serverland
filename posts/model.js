const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
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

module.exports = mongoose.model("Post", PostSchema);
