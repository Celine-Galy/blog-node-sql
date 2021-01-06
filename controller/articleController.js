const express = require('express');
const ArticleRepository = require('../article-repository');
const CategoryRepository = require('../category-repository');
const DBManager = require('../db-manager');
const router = express.Router();
const db = new DBManager();
const articleRepository = new ArticleRepository(db);
const categoryRepository = new CategoryRepository(db);

router.get('/', (req, res) => {
    articleRepository.findAll().then((articles) => {
        categoryRepository.findAllCategories().then((list) => {
            res.render('index', {
                articles: articles,
                list: list,
                viewTitle: "Bienvenue!"
            });
        })
    }).catch((err) => {
        console.log(err);
        throw err;
    });
});

module.exports = router;