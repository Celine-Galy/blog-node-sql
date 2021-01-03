const multer = require('multer');

class PictureRepository {

    // _SELECT_ALL_QUERY = "select * from pictures";
    _dbManager;
    constructor(dbManager) {
        this._dbManager = dbManager;

    }
    findAllPictures() {

        let query = "SELECT * FROM pictures";
        return this._dbManager.query(query);


    }
    insertPicture() {
        let query = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '" + req.file.mimetype + "', '" + req.file.size + "')";
        return this._dbManager.query(query);
    }

}

module.exports = PictureRepository;