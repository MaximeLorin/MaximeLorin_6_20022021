const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauces = async (req, res, next) => {
  try {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    const save = await sauce.save();
    res.status(201).json({ message: "Objet Enregistré ! " });
  } catch {
    res.status(400).json({ error });
  }
};

exports.likeSauces = async (req, res, next) => {
  try {
    const sauceLikes = JSON.parse(req.body.like);
    const paramsId = req.params.id;
    const userId = req.body.userId;

    const sauce = await Sauce.findOne({ _id: paramsId });

    const arrayLiked = sauce.usersLiked;
    const arrayDisliked = sauce.usersDisliked;
    function updateLikes(likeValue) {
      Sauce.updateOne({ _id: paramsId }, { ...likeValue, _id: paramsId })
        .then((sauce) => res.status(200).json({ message: "like modifié !" }))
        .catch((error) =>
          res.status(404).json((error) => res.status(404).json(error))
        );
    }
    switch (sauceLikes) {
      case -1:
        arrayDisliked.push(userId);
        const totalDislikes = {
          dislikes: arrayDisliked.length,
          usersDisliked: arrayDisliked,
        };
        updateLikes(totalDislikes);
        break;
      case 0:
        const userIdLiked = arrayLiked.find((id) => id === userId);
        const userIdDisliked = arrayDisliked.find((id) => id === userId);
        if (userIdLiked) {
          const indexId = arrayLiked.indexOf(userIdLiked);
          arrayLiked.splice(indexId, 1);
          console.log(arrayDisliked);
          const totalLikes = {
            likes: arrayLiked.length,
            usersLiked: arrayLiked,
          };
          updateLikes(totalLikes);
        } else if (userIdDisliked) {
          const indexId = arrayDisliked.indexOf(userIdDisliked);
          arrayDisliked.splice(indexId, 1);

          const totalDislikes = {
            dislikes: arrayDisliked.length,
            usersDisliked: arrayDisliked,
          };

          updateLikes(totalDislikes);
        }
        break;
      case 1:
        arrayLiked.push(userId);
        const totalLikes = {
          likes: arrayLiked.length,
          usersLiked: arrayLiked,
        };
        updateLikes(totalLikes);
        break;
    }
  } catch {
    res.status(500).json(error);
  }
};

exports.modifySauce = async (req, res, next) => {
  try {
    const sauceObject = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    const modifyIt = await Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    );
    res.status(200).json({ message: "Objet modifié !" });
  } catch {
    res.status(404).json(error);
  }
};

exports.deleteSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    const filename = sauce.imageUrl.split("/images/")[1];

    fs.unlink(`images/${filename}`, () => {
      sauce
        .deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimmé !" }))
        .catch((error) => res.status(404).json({ error }));
    });
  } catch {
    res.status(404).json({ error });
  }
};

exports.getSauce = async (req, res, next) => {
  try {
    const sauces = await Sauce.findOne({ _id: req.params.id });
    res.status(200).json(sauces);
  } catch {
    res.status(400).json(error);
  }
};

exports.getSauces = async (req, res, next) => {
  try {
    const sauces = await Sauce.find();
    res.status(200).json(sauces);
  } catch {
    res.status(400).json(error);
  }
};
