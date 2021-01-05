class CategoryRepository {

    _dbManager;
    constructor(dbManager) {
        this._dbManager = dbManager;

    }
    findAllCategories() {

        let query = "SELECT * FROM categories";
        return this._dbManager.query(query);
    }
    insertCategory(name, description) {
        let query = `INSERT INTO categories (name, description) VALUES ('${name}' , '${description}')`;
        console.log(query);
        return this._dbManager.query(query);
    }
    updateCategory(id, name, description) {
        let query = `UPDATE categories SET name = '${name}' , description = '${description}' WHERE id= '${id}'`;
        console.log(query);
        return this._dbManager.query(query);
    }
    findCategoryById(id) {
        let queryfind = `SELECT (id),(name),(description) FROM categories WHERE id='${id}'`;
        console.log(queryfind);
        return this._dbManager.query(queryfind);
    }
    deleteCategory(id) {
        let query = `DELETE FROM categories WHERE id='${id}'`;
        console.log(query);
        return this._dbManager.query(query);
    }
}

module.exports = CategoryRepository;