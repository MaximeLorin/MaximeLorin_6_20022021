const mongoose = require("mongoose");
const {
  Types: { ObjectId },
} = mongoose;

module.exports = (req, res, next) => {
  const { id } = req.params;

  if (ObjectId.isValid(id) && new ObjectId(id).toString() === id) {
    next();
  } else {
    res.status(400).json("Bad Request: invalid mongo ID !");
  }
};
