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
    insertPicture(insertfilename, insertpath) {
        let query = `INSERT INTO pictures (picturename, type) VALUES ('${insertfilename}', '${insertpath}')`;
        console.log(query);
        return this._dbManager.query(query);
    }

}

module.exports = PictureRepository;