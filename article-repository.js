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
    insertArticle() {
        let query = "INSERT into articles (title, id_picture, content, date_creation,) INNER JOIN articles_categories ON articles_categories.id_article = articles.id INNER JOIN categories on categories.id = articles_categories.id_category ";
        return this._dbManager.query(query);
    }


    searchByName(search) {

        let query = "SELECT * FROM articles WHERE content like '%" + search + "%'";
        return this._dbManager.query(query);
    }

}

module.exports = ArticleRepository;