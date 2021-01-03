const express = require('express');
const ArticleRepository = require('../article-repository');
const CategoryRepository = require('../category-repository');
const UserRepository = require('../user-repository');

const DBManager = require('../db-manager');
const router = express.Router();

const db = new DBManager();
const articleRepository = new ArticleRepository(db);
const categoryRepository = new CategoryRepository(db);
const userRepository = new UserRepository(db);




router.get("/", (req, res) => {
    categoryRepository.findAllCategories().then((categories) => {
        userRepository.findAllUsers().then((authors) => {
            res.render("article/addOrEdit", {
                categories: categories,
                authors: authors,
                viewTitle: "Insert Article"
            })
        })
    })
});

// handling the post route of the form

router.post("/", (req, res) => {
    if (req.body._id == "") {
        articleRepository.insertArticle().then((err) => {
            // if (!err) {
            res.redirect('article/list');
            // } else {

            //     if (err.name == "ValidationError") {
            //         handleValidationError(err, req.body);
            //         res.render("article/addOrEdit", {
            //             viewTitle: "Insert Article",
            //             article: req.body
            //         })
            //     }
            //     console.log("Error occured during record insertion" + err);
            // }
        }).catch((err) => {
            throw err;
        })

    } else {
        updateRecord(req, res);
    }
});

// to view all the articles present in the database

router.get('/list', (req, res) => {

    articleRepository.findAll().then((articles) => {

        res.render('article/list', {
            articles: articles,
            viewTitle: "Admin"
        });
    }).catch((err) => {
        throw err;

    });
});

module.exports = router;