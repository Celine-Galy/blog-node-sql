class ArticleRepository {

    // _SELECT_ALL_QUERY = "select * from articles";
    _dbManager;
    constructor(dbManager) {
        this._dbManager = dbManager;

    }
    findAll() {

        let query = `SELECT * FROM articles 
        INNER JOIN users on users.id_user = articles.id_user 
        INNER JOIN pictures on pictures.id_picture = articles.id_picture 
        INNER JOIN articles_categories on articles_categories.id_article = articles.id_article
        INNER JOIN categories on categories.id_category = articles_categories.id_category`;
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

    findArticleById(id) {
        let queryarticle = `SELECT * FROM articles 
        INNER JOIN users on users.id_user = articles.id_user 
        INNER JOIN pictures on pictures.id_picture = articles.id_picture 
        INNER JOIN articles_categories on articles_categories.id_article = articles.id_article
        INNER JOIN categories on categories.id_category = articles_categories.id_category WHERE articles.id_article='${id}'`;
        console.log(queryarticle);
        return this._dbManager.query(queryarticle);
    }

    findArticleByCategory(id) {
        let query = `SELECT * FROM articles INNER JOIN users on users.id_user = articles.id_user 
        INNER JOIN pictures on pictures.id_picture = articles.id_picture 
        INNER JOIN articles_categories on articles_categories.id_article = articles.id_article
        INNER JOIN categories on categories.id_category = articles_categories.id_category WHERE categories.id_category='${id}'`;
        console.log(query);
        return this._dbManager.query(query);
    }

    updateArticle(id, title, id_picture, content, date_creation, id_user) {
        let query = `UPDATE articles SET title = '${title}' , id_picture = '${id_picture}', content = '${content}', date_creation = '${date_creation}', id_user = '${id_user}' WHERE id_article = '${id}'`;
        console.log(query);
        return this._dbManager.query(query);
    }
    updateArticleCategory(id, id_category) {
        let query = `UPDATE articles_categories SET id_article = '${id}' , id_category = '${id_category}' WHERE id_article = '${id}'`;
        console.log(query);
        return this._dbManager.query(query);
    }

    deleteArticle(id) {
            let query = `DELETE FROM articles_categories WHERE id_article ='${id}'`;
            `DELETE  FROM articles WHERE id_article = '${id}'`;

            console.log(query);
            return this._dbManager.query(query);
        }
        // searchByName(search) {

    //     let query = "SELECT * FROM articles WHERE content like '%" + search + "%'";
    //     return this._dbManager.query(query);
    // }

}

module.exports = ArticleRepository;