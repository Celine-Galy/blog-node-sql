class ArticleRepository {

    // _SELECT_ALL_QUERY = "select * from articles";
    _dbManager;
    constructor(dbManager) {
        this._dbManager = dbManager;

    }
    findAll() {

        let query = "SELECT * FROM articles INNER JOIN users on users.id = articles.id_user INNER JOIN pictures on pictures.id_picture = articles.id_picture INNER JOIN articles_categories on articles_categories.id_article = articles.id INNER JOIN categories on categories.id = articles_categories.id_category";
        return this._dbManager.query(query);


    }
    insertArticle(title, id_picture, content, date_creation, id_user) {
        let query = `INSERT into articles (title, id_picture, content, date_creation, id_user) VALUES ('${title}' , '${id_picture}', '${content}','${date_creation}', '${id_user}')`;
        console.log(query);
        return this._dbManager.query(query);
    }
    insertArticleJoinCategory(id_article, id_category) {
        let query = `INSERT into articles_categories (id_article, id_category) VALUES ('${id_article}','${id_category}')`;
        return this._dbManager.query(query);
    }

    searchByName(search) {

        let query = "SELECT * FROM articles WHERE content like '%" + search + "%'";
        return this._dbManager.query(query);
    }

}

module.exports = ArticleRepository;