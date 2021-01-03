const express = require('express');
const CategoryRepository = require('../category-repository');
const DBManager = require('../db-manager');
const router = express.Router();
const db = new DBManager();
const categoryRepository = new CategoryRepository(db);

router.get('/', (req, res) => {

    categoryRepository.findAllCategories().then((categories) => {
        res.render('listCategory', {
            categories,
            viewTitle: "Liste des catégories"
        });
    }).catch((err) => {
        console.log(err);
        throw err;
    });
});