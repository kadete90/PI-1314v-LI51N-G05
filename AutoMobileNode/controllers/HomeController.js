

var nrAdvItems = 5;
var nrUsersItems = 5;



module.exports = function(AccountLogic, AdvertLogic) {
    
    function index(req, res) {

        var lastUsers = AccountLogic.getLast(nrUsersItems)
        var lastAdverts = AdvertLogic.getLast(nrAdvItems);

        res.render('Home', { title: "HOME", users:lastUsers, adverts : lastAdverts });
    }





    return { index :index}

}