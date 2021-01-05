const express = require('express');
const router = express.Router();
const PictureRepository = require('../picture-repository');
const DBManager = require('../db-manager');
const db = new DBManager();
const multer = require('multer');
const path = require('path');

const pictureRepository = new PictureRepository(db);

//Set storage Engine
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

//Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }

}).single('image');

//Check file type
function checkFileType(file, cb) {
    //Allowed extension
    const filetypes = /jpeg|jpg|png|gif/;
    //Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);

    } else {
        cb('Error: Images Only!');
    }
}

router.get('/', (req, res) =>
    res.render('picture/addPicture'));


router.post('/upload', (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            res.render('picture/addPicture', {
                msg: err
            });
        } else {
            console.log(req.file);
            if (req.file == undefined) {

                res.render('picture/addPicture', {
                    msg: 'Error: No File Selected!'
                });

            } else {
                insertfilename = req.file.filename;
                insertpath = req.file.path;
                pictureRepository.insertPicture(insertfilename, insertpath).then((err) => {
                    res.render('picture/addPicture', {
                        msg: 'File upload!',
                        file: req.file
                    });
                }).catch((err) => {
                    throw err;
                })

            }

        }

    })
});


module.exports = router;