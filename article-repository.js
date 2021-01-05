class ArticleRepository {

    // _SELECT_ALL_QUERY = "select * from articles";
    _dbManager;
    constructor(dbManager) {
        this._dbManager = dbManager;

    }
    findAll() {

        let query = "SELECT * FROM articles";
        return this._dbManager.query(query);


    }
    insertArticle(title, id_picture, content, date_creation, id_user) {
        let query = `INSERT into articles (title, id_picture, content, date_creation, id_user) VALUES ('${title}' , '${id_picture}', '${content}', '${id_picture}','${date_creation}', '${id_user}')`;
        console.log(query);
        return this._dbManager.query(query);
    }


    searchByName(search) {

        let query = "SELECT * FROM articles WHERE content like '%" + search + "%'";
        return this._dbManager.query(query);
    }

}

module.exports = ArticleRepository;