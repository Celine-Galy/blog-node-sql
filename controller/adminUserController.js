const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const UserRepository = require('../user-repository');
const PictureRepository = require('../picture-repository');
const DBManager = require('../db-manager');
const router = express.Router();

const db = new DBManager();
const userRepository = new UserRepository(db);
const pictureRepository = new PictureRepository(db);


router.get("/addUser", (req, res) => {
    pictureRepository.findAllPictures().then((picture) => {
        res.render("adminUser/addUser", {
            picture: picture,
            viewTitle: "Créer un nouvel utilisateur"
        });
    })
});


module.exports = router;