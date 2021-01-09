const express = require('express');
const ArticleRepository = require('../article-repository');
const CategoryRepository = require('../category-repository');
const UserRepository = require('../user-repository');
const PictureRepository = require('../picture-repository');

const DBManager = require('../db-manager');
const router = express.Router();

const db = new DBManager();
const articleRepository = new ArticleRepository(db);
const categoryRepository = new CategoryRepository(db);
const userRepository = new UserRepository(db);
const pictureRepository = new PictureRepository(db);

// router.get("/addOrEditArticle", (req, res) => {
//     res.render("adminArticle/addOrEditArticle", {
//         viewTitle: "Insert Article"
//     });
// });

router.get("/addOrEditArticle", (req, res) => {
    categoryRepository.findAllCategories().then((categories) => {
        userRepository.findAllUsers().then((authors) => {
            pictureRepository.findAllPictures().then((picture) => {
                res.render("adminArticle/addOrEditArticle", {
                    categories: categories,
                    picture: picture,
                    authors: authors,
                    viewTitle: "Insert Article"
                })
            })
        })
    })
});

// handling the post route of the form

router.post("/", (req, res) => {

    const title = req.body.title;
    const id_picture = req.body.id_picture;
    const content = req.body.content;
    const date_creation = req.body.date_creation;
    const id_user = req.body.id_user;


    if (req.body.id_article == "") {

        articleRepository.insertArticle(title, id_picture, content, date_creation, id_user).then((result) => {
            const id_article = result.insertId;
            const id_category = req.body.id_category;
            articleRepository.insertArticleJoinCategory(id_article, id_category).then((err) => {

                res.redirect('adminArticle/list')

            });
        }).catch((err) => {
            throw err;
        })
    }
});

// to view all the articles present in the database

router.get('/list', (req, res) => {

    articleRepository.findAll().then((articles) => {

        res.render('adminArticle/list', {
            articles: articles,
            viewTitle: "Admin"
        });
    }).catch((err) => {
        throw err;

    });

});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    articleRepository.deleteArticle(id).then((err) => {
        articleRepository.findArticleById(id);

        res.redirect('adminArticle/list');

    }).catch((err) => {
        throw err;
    })

});


module.exports = router;