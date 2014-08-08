
/*
 * UserLogic module
 */
 /*TODO*/

function createLoginModel(title, username, errorMessage) {
	return { title: title || "", username: username || "", errorMessage: errorMessage || "" }
}

module.exports = function(data) {
	function getAllInternal(){
		return data.getAll(); 
	};
	function getInternal(id){
		if(Number(id) === NaN || typeof Number(id) != 'number' )
			throw "Invalid id";
		return data.get(id); 
	};
    function login(req, res){
        res.render('login', createLoginModel("logon"));
    };
    function loginValidate(req, res){
        var post = req.body;
        if (post.user === 'john' && post.password === '1234') {
            res.setCurrentUser("john");
            res.redirect('/tweets');
        } else {
            res.render('login', createLoginModel("logon", post.user, 'Invalid username or password' ));
        }
    };

    function logout(req, res){
	    console.log("===============");
	    res.deleteCurrentUser();
	    res.redirect('/login');
    };

    return { 
		getAll: getAllInternal,
		get: getInternal,
        login: login,
        loginValidate: loginValidate,
        logout : logout
	};
};