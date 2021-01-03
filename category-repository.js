const mysql = require('mysql');
class CategoryRepository {

    // _SELECT_ALL_QUERY = "select * from categories";
    _dbManager;
    constructor(dbManager) {
        this._dbManager = dbManager;

    }
    findAllCategories() {

        let query = "SELECT * FROM categories";
        return this._dbManager.query(query);
    }
    insertCategory(category) {

        let query = `INSERT INTO categories (name, description) VALUES ('${category[0]}', '${category[1]}')`;
        console.log(query);
        return this._dbManager.query(query);
    }
    updateCategory(category) {
        let query = `UPDATE categories SET (name = '${category[1]}' , description = '${category[2]}') WHERE id= '${category[0]}'`;
        console.log(query);
        return this._dbManager.query(query);
    }
    findCategoryById(category) {
        let query = `SELECT * FROM categories WHERE id= '${category[0]}'`;
        console.log(query);
        return this._dbManager.query(query);
    }
}

module.exports = CategoryRepository;