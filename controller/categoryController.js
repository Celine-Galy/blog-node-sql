const express = require('express');
const CategoryRepository = require('../category-repository');
const ArticleRepository = require('../article-repository');

const DBManager = require('../db-manager');
const router = express.Router();
const db = new DBManager();
const categoryRepository = new CategoryRepository(db);
const articleRepository = new ArticleRepository(db);

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
        articleRepository.findArticleByCategory(id).then((articles) => {

            res.render('category/editOneCategory', {

                category: category,
                articles: articles,
                viewTitle: "Articles par catégorie"
            })

        }).catch((err) => {
            throw err;
        })
    })
});
module.exports = router;