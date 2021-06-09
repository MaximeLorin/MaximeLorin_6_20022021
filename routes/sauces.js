const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.getSauces);

router.post("/", auth, multer, saucesCtrl.createSauces);

module.exports = router;
