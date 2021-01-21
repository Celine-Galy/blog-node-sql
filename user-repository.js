class UserRepository {

    // _SELECT_ALL_QUERY = "select * from users";
    _dbManager;
    constructor(dbManager) {
        this._dbManager = dbManager;

    }
    findAllUsers() {
        let query = "SELECT * FROM users";
        return this._dbManager.query(query);
    }

    insertUser() {
        let query = `INSERT into users (user_firstname, user_lastname, user_password, user_email, id_user_picture) VALUES ('${user_firstname}' , '${user_lastname}', '${user_password}','${user_email}', '${id_user_picture}')`;
        return this._dbManager.query(query);
    }
    selectByPassword(user_email, user_password) {
        let query = `SELECT * FROM users WHERE user_email = '${user_email}' AND user_password = '${user_password}'`;
        console.log(query);
        return this._dbManager.query(query);
    }

}

module.exports = UserRepository;