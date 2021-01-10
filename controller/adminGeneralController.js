const express = require('express');
const router = express.Router();
const DBManager = require('../db-manager');
const db = new DBManager();

router.get("/indexAdmin", (req, res) => {
    res.render("adminGeneral/indexAdmin", {
        viewTitle: "Admin"
    });
});

module.exports = router;