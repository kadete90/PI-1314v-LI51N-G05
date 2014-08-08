
 var _ = require("underscore");
 

// public String Username { get; set; }
//
//        public String Password { get; set; }
//
//        public String Email { get; set; }
//
//        public int? PhoneNr  { get; set; }
//
//        public string FullName { get; set; }
//        public DateTime RegisterDate { get; set; }
//
//        public DistrictEnum District { get; set; }
//
//        public bool IsStand = false;
//        public string StandLink { get; set; }
//        public GeoLocalization GeoLocalization = null;
//string username, string password, string email, DistrictEnum district, String fullName, int? pnr = null

 var user = require('../model/User');
 function getInitialUsers() {
	var u = [];
     var fullname = "João Constantino";
     var name = "User";
	for(var i = 0; i < 20; ++i) {
	    u.push( new user(name + i, 123, fullname, name + "@gmail.com", 910000000, "Lisboa",
             i%5,"somelink"));
	}
	return u;
 }
 
module.exports = function(advertData) {
	var users = getInitialUsers();
	
	function getAllInternal(){
		return users; 
	};

	function getInternal(username) {
	    
        return _(users).find(function(user) { return user.username === username; });
	};
    function addInternal(user) {
        var userInDAL = getInternal(user.username);
        if (!isNullOrUndefined(userInDAL)) return false;
        users.push(user);
        return true;
    }

    function deleteInternal(username) {
        var userInDAL = getInternal(username);
        if (isNullOrUndefined(userInDAL)) return false;
        _(users).without(userInDAL);
        return true;
    }

    function getAllInternalPaged(pageNr, itemsPerPage) {
        var res = [];
        var startIdx = itemsPerPage * pageNr;
        if (startIdx > users.length) return res;
        var user;
        for (var i = 0;i<itemsPerPage;i++) {
            user = users[startIdx + i];
            if(!isNullOrUndefined(user))
                res.push(user);
        }
        return res;
    }

    function getAdvertsInternal(user) { return advertData.getByOwner(user);}

	return { 
		getAll: getAllInternal,
		get: getInternal,
        add: addInternal,
        delete: deleteInternal,
        getAllPaged: getAllInternalPaged,
        getAdverts: getAdvertsInternal
	};
};
