const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const checkId = require("../middleware/checkId");
const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.getSauces);

router.post("/", auth, multer, saucesCtrl.createSauces);

router.post("/:id/like", auth, checkId, saucesCtrl.likeSauces);

router.get("/:id", auth, checkId, saucesCtrl.getSauce);

router.put("/:id", auth, checkId, multer, saucesCtrl.modifySauce);

router.delete("/:id", auth, checkId, saucesCtrl.deleteSauce);

module.exports = router;
