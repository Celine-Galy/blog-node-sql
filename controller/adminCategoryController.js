const express = require('express');
const CategoryRepository = require('../category-repository');
const DBManager = require('../db-manager');
const router = express.Router();

const db = new DBManager();
const categoryRepository = new CategoryRepository(db);


router.get("/adminCategory/addOrEdit", (req, res) => {
    res.render("adminCategory/addOrEdit", {
        viewTitle: "Insert Category"
    });
});

// handling the post route of the form

router.post("/", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    if (req.body.id == "") {

        categoryRepository.insertCategory(name, description).then((err) => {

            res.redirect('adminCategory/list');

        }).catch((err) => {
            console.log(err);
            throw err;
        })
    } else {
        categoryRepository.updateCategory(id, name, description).then((err) => {
            categoryRepository.findCategoryById(id);

            res.redirect('adminCategory/list');

        }).catch((err) => {
            console.log(err);
            throw err;
        })
    }
});


// to view all the articles present in the database

router.get('/list', (req, res) => {

    categoryRepository.findAllCategories().then((categories) => {

        res.render('adminCategory/list', {
            categories: categories,
            viewTitle: "Admin"
        });
    }).catch((err) => {
        throw err;
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    categoryRepository.findCategoryById(id).then((categories) => {

        res.render("adminCategory/updateCategory", {
            viewTitle: "Update Category",
            categories: categories
        })
    }).catch((err) => {
        throw err;
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    categoryRepository.deleteCategory(id).then((err) => {
        categoryRepository.findCategoryById(id);
        res.redirect('/adminCategory/list');

    }).catch((err) => {
        throw err;
    })

});

module.exports = router;