module.exports = function(accountLogic) {
    function index(req, res) {
        var loggedUser = accountLogic.get(req.user);
        res.render('Account/Index', { title:"Account",user: loggedUser });
    };

    var edit = function(req, res) {
        var user = accountLogic.get(req.user);
        res.render('Account/Edit',{title:"Edit Account", user:user});
    };

    var create = function(req, res){
        var existingDistricts = enums.Districts();
        console.log(existingDistricts);
        res.render('Account/Create',{title:"Create Account", districts : existingDistricts});
    };

    var login = function(req, res){
        res.render('Account/Login',{title:"Login"});
    };

    var logout = function(req, res){
        console.log("===============");
        res.deleteCurrentUser();
        res.redirect('Account/Login');
    };

    var loginValidate = function(req, res) {
        var post = req.body;

        var sameViewWithError = function (errMsg) {
            res.render('Account/Login', {title: "logon", errorMsg: errMsg })
        }

        var user = accountLogic.get(post.Username);

        if (!user) sameViewWithError('Invalid Username');

        if (post.password == user.Password()) {
            res.setCurrentUser(post.Username);
            res.redirect('Account/ManageAds');
        } else {
            sameViewWithError('Wrong Password');
        }
    };

var manageAds = function (req, res) {
   var adsFromUser = accountLogic.getAdvertsByUser(req.user);
  var user = accountLogic.get(req.user);
    res.render('Account/ManageAds', {title: "Manage Ads",user:user, AdvertiseModel:adsFromUser});
};

return { index   : index,
    edit         : edit,
    create       : create,
    login        : login,
    manageAds    : manageAds,
    logout       : logout,
    loginValidate: loginValidate}

};