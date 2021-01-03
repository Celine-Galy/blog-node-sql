const express = require('express');
const CategoryRepository = require('../category-repository');
const DBManager = require('../db-manager');
const router = express.Router();

const db = new DBManager();
const categoryRepository = new CategoryRepository(db);


router.get("/", (req, res) => {
    res.render("category/addOrEdit", {
        viewTitle: "Insert Category"
    })
});

// handling the post route of the form

router.post("/", (req, res) => {
    const category = [
        req.body.name,
        req.body.description
    ]
    if (req.body.id == "") {
        categoryRepository.insertCategory(category).then((err) => {

            // if (!err) {
            res.redirect('category/list');
            // } else {
            //     if (err.name == "ValidationError") {
            //         handleValidationError(err, req.body);
            //         res.render("category/addOrEdit", {
            //             viewTitle: "Insert Category",
            //             categories: req.body
            //         })
            //     }
            //     console.log("Error occured during record insertion" + err);
            // }
        }).catch((err) => {
            console.log(err);
            throw err;
        });

    } else {
        const category = [
            req.body.id,
            req.body.name,
            req.body.description
        ];

        categoryRepository.updateCategory(category, { id: req.body.id, }, req.body, { new: true }).then((err, categories => {
                // if (!err) {
                categories
                res.redirect('category/list');
                // } else {
                //     if (err.name == "ValidationError") {
                //         handleValidationError(err, req.body);
                //         res.render("category/addOrEdit", {
                //             viewTitle: 'Update Category',
                //             categories: req.body
                //         });
                //     } else {
                //         console.log("Error occured in Updating the records" + err);
                //     }
                // }
            }).catch((err) => {
                console.log(err);

                throw err;
            })

        )
    }
});

// to view all the categories present in the database

router.get('/list', (req, res) => {

    categoryRepository.findAllCategories().then((categories) => {
        res.render('category/list', {
            categories,
            viewTitle: "Admin"
        })
    }).catch((err) => {
        throw err;
    })
});

router.get("/:id", (req, res) => {
    const category = [
        req.body.id
    ]
    categoryRepository.findCategoryById(req.params.id, category, (err, doc) => {

        res.render("category/addOrEdit", {
            viewTitle: "Update Category",
            categories: doc
        });
    }).catch((err) => {
        console.log(err);
        throw err;
    });
});

module.exports = router;