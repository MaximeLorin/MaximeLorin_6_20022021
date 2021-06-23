const mongoose = require("mongoose");

const {
  Types: { ObjectId },
} = mongoose;

const validateObjectId = (id) =>
  ObjectId.isValid(id) && new ObjectId(id).toString() === id;

module.exports = validateObjectId;
