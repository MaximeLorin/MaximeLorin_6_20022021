const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.getSauces);

router.post("/", auth, multer, saucesCtrl.createSauces);

router.post("/:id/like", auth, saucesCtrl.likeSauces);

router.get("/:id", auth, saucesCtrl.getSauce);

router.put("/:id", auth, multer, saucesCtrl.modifySauce);

router.delete("/:id", auth, saucesCtrl.deleteSauce);

module.exports = router;
