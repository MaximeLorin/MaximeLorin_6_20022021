const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauces = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet Enregistré ! " }))
    .catch((error) => {
      res.status(400).json({ error });
      console.log(error);
    });
};

exports.likeSauces = (req, res, next) => {
  const sauceLikes = JSON.parse(req.body.like);
  const paramsId = req.params.id;
  const userId = req.body.userId;
  Sauce.findOne({ _id: paramsId })
    .then((sauce) => {
      const arrayLiked = sauce.userLiked;
      const arrayDisliked = sauce.userDisliked;
      function updateLikes(likeValue) {
        Sauce.updateOne({ _id: paramsId }, { ...likeValue, _id: paramsId })
          .then((sauce) => res.status(200).json({ message: "like modifié !" }))
          .catch((error) =>
            res.status(404).json((error) => res.status(404).json(error))
          );
      }
      if (sauceLikes == -1) {
        arrayDisliked.push(userId);
        const totalDislikes = {
          dislikes: arrayDisliked.length,
          userDisliked: arrayDisliked,
        };
        updateLikes(totalDislikes);
      } else if (sauceLikes === 0) {
        const userIdLiked = arrayLiked.find((id) => id === userId);
        const userIdDisliked = arrayDisliked.find((id) => id === userId);
        if (userIdLiked) {
          const indexId = arrayLiked.indexOf(userIdLiked);
          arrayLiked.splice(indexId, 1);
          console.log(arrayDisliked);
          const totalLikes = {
            likes: arrayLiked.length,
            userLiked: arrayLiked,
          };
          updateLikes(totalLikes);
        } else if (userIdDisliked) {
          const indexId = arrayDisliked.indexOf(userIdDisliked);
          arrayDisliked.splice(indexId, 1);

          const totalDislikes = {
            dislikes: arrayDisliked.length,
            userDisliked: arrayDisliked,
          };

          updateLikes(totalDislikes);
        }
      } else if (sauceLikes == 1) {
        arrayLiked.push(userId);
        const totalLikes = {
          likes: arrayLiked.length,
          userLiked: arrayLiked,
        };
        updateLikes(totalLikes);
      }
    })
    .catch((error) => res.status(500).json(error));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then((sauce) => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) =>
      res.status(404).json((error) => res.status(404).json(error))
    );
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        sauce
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimmé !" }))
          .catch((error) => res.status(404).json({ error }));
      });
    })
    .catch((error) => res.status(404).json(error));
};

exports.getSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json(error));
};

exports.getSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json(error));
};
