const path = require('path');
const express = require('express'); // Appel de la dépendance
const app = express(); // Initialisation de l'application
const DBManager = require('./db-manager');
const articleController = require('./controller/articleController');
const categoryController = require('./controller/categoryController');
const adminArticleController = require('./controller/adminArticleController');
const adminCategoryController = require('./controller/adminCategoryController');
const pictureController = require('./controller/pictureController');
const adminUserController = require('./controller/adminUserController');
const adminGeneralController = require('./controller/adminGeneralController');


const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');

// Import function exported by newly installed node modules.
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, '/views/'));

app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'hbs');

//Serves static files (we need it to import a css file)
app.use(express.static('public'));


app.listen(5000, () => {
    console.log("Server is listening Port 5000");
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', articleController);
app.use('/category', categoryController);
app.use('/adminArticle', adminArticleController);
app.use('/adminCategory', adminCategoryController);
app.use('/picture', pictureController);
app.use('/adminUser', adminUserController);
app.use('/adminGeneral', adminGeneralController);