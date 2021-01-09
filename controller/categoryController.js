const express = require('express');
const CategoryRepository = require('../category-repository');
const DBManager = require('../db-manager');
const router = express.Router();
const db = new DBManager();
const categoryRepository = new CategoryRepository(db);

router.get('/listCategory', (req, res) => {

    categoryRepository.findAllCategories().then((list) => {
        res.render('category/listCategory', {
            list,
            viewTitle: "Liste des catégories"
        });
    }).catch((err) => {
        console.log(err);
        throw err;
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    categoryRepository.findCategoryById(id).then((category) => {

        res.render('category/editOneCategory', {

            category: category
        })
    }).catch((err) => {
        throw err;
    });
});
module.exports = router;