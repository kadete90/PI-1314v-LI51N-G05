
/**
 * Module dependencies.
 */
var ACCOUNT_LOGIN = '/account/login';
var ACCOUNT_LOGOUT = '/account/logout';

var express = require('express');
var cookieParser = require('cookie-parser');
var multipart = require('connect-multiparty');


GLOBAL.__mybasedir = __dirname;
GLOBAL._ = require('underscore');
GLOBAL.should = require('should');
GLOBAL.enums = new (require('./model/Enums'));
GLOBAL.stringFormat = require('stringformat');
GLOBAL.HTMLHelper = require('native-view-helpers');
GLOBAL.myHTMLHelper = require('./Helpers/HtmlHelper')();
GLOBAL.__mydomain = 'http://localhost:3000/';
GLOBAL.cookieSignature = require('cookie-signature');

GLOBAL.isNullOrEmpty = function(){
    if(arguments.length==0)
        return this.length==0 || ( /^\s+$/.test(this))

    for(var i =0;i<arguments.length;i++){
        var elem = arguments[i];
        if(elem == null || elem.length==0 || ( /^\s+$/.test(elem)))
            return false;
    }
    return true;
};

/* ---- DataAcess ---- */
var AdvertData = require('./data/AdvertDataMemory')();
var UserData = require('./data/AccountDataMemory')(AdvertData);
var BrandData= require('./data/BrandDataMemory')();


/* ---- Logic ---- */
var AccountLogic = require('./logic/AccountLogic')(UserData,AdvertData);
var AdvertLogic = require('./logic/AdvertLogic')(AdvertData);
var BrandLogic = require('./logic/BrandLogic')(BrandData);


/* ---- Controller ---- */
var AccountController = require('./controllers/AccountController')(AccountLogic,AdvertLogic);
var AdvertController = require('./controllers/AdvertController')(AdvertLogic,BrandLogic,AccountLogic);
var HomeController = require('./controllers/HomeController')(AccountLogic,AdvertLogic);
var AjaxController = require('./controllers/AjaxController')(BrandLogic,AdvertLogic);

var auth = require('./middleware/Auth');
var http = require('http');
var path = require('path');

var app = express();
var expressLayouts = require('express-ejs-layouts');



// all environments

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(expressLayouts);
app.use(express.favicon(__dirname + '/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(cookieParser(""));
app.use(express.json());
app.use(auth(ACCOUNT_LOGIN));
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(connect.multiparty());
//app.use(function(req,res,next){res.locals = app.locals; next();})
app.use(app.router);

/* has to be used *BELOW* router, otherwise will not receive errors from app.(get|post) */
//app.use(function(err, req, res, next) {
//    if(! err ) next();
//
//        console.log(err.stack);
//        res.send(500, { error: err });
//
//});

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/account', AccountController.index);
app.get('/account/index', AccountController.index);
app.get('/account/create', AccountController.create);
app.get('/account/edit', AccountController.edit);
//app.post('/account/edit/', AccountController.edit);
app.get(ACCOUNT_LOGIN, AccountController.login);
app.get('/account/manageAds', AccountController.manageAds);
app.post(ACCOUNT_LOGIN, AccountController.loginValidate);
app.get(ACCOUNT_LOGOUT, AccountController.logout);


app.get('/advert', AdvertController.list);
app.get('/advert/index', AdvertController.list);
app.get('/advert/add', AdvertController.add);
app.get('/advert/details/:ID', AdvertController.details);
app.get('/advert/edit/:ID', AdvertController.edit);
app.post('/advert/edit/:ID', AdvertController.postEdit);
app.post('/advert/cancel/:ID', AdvertController.cancel);
app.post('/advert/activate/:ID', AdvertController.activate);
app.post('/advert/delete/:ID', AdvertController.adDelete);
app.get('/advert/search', AdvertController.search);
app.get('/advert/searched', AdvertController.searchPost);
app.post('/advert/add', AdvertController.adPost);
app.post('/advert/delete', AdvertController.adDelete);
app.post('/advert/commentary', AdvertController.addComment)



app.get("/",HomeController.index);
app.get("/index", HomeController.index);

app.get("/ajax/brands/:brandName", AjaxController.ModelsFromBrand);

//app.get('*', function(req, res) {
//    console.log("NOT FOUND ");res.redirect('/'); });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
