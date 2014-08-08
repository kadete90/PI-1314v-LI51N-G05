var COOKIE_NAME = "____user_id____";

 
module.exports = function(loginUri) {
	return function(req, rsp, next) {
		var userInRequest = req.cookies[COOKIE_NAME] || null;
		req.user = userInRequest;
        console.log(req.user + " " + req.path);
	    var regExp = new RegExp("/(ajax|css|images|fonts|scripts|cars\.json)","i"); // true to ignoreCase on match
        
		rsp.setCurrentUser = function(user) {
			rsp.cookie(COOKIE_NAME, user);
		};
		rsp.deleteCurrentUser = function() {
			rsp.cookie(COOKIE_NAME, "", {maxAge: -1});
		};

		if (req.user || req.path == loginUri || regExp.test(req.path)) {
            rsp.locals.reqUser = userInRequest;
			next();
			
		} else {
		    console.log("NO PERMISSION TO GET RESOURCE -> REDIRRECTED TO " + loginUri);
			rsp.redirect(loginUri);
		}
		
	};
};