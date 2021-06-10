const mongoose = require("mongoose");

const saucesShema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  userLiked: { type: [String], required: true },
  userDisliked: { type: [String], required: true },
});

module.exports = mongoose.model("Sauces", saucesShema);
