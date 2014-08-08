
module.exports = function(accountData,advertData) {
	function getAllInternal(){
		return accountData.getAll(); 
	}

	function getInternal(username){
		if(username== null ||  typeof(username) != 'string' )
            throw new {status:400, msg: "invalid username"};
		return accountData.get(username); 
	};

    function addInternal(user) {
        if (isNullOrUndefined(user))return false;
        return accountData.add(user);
    };

    function deleteInternal(user) {
        if (isNullOrUndefined(user)) return false;
        return accountData.delete(user);
    }

    function getAllInternalPaged(pageNr, itemsPerPage) {
        var validArgs = pageNr ==!NaN && itemsPerPage ==!NaN; //compara se so estritamente diferentes de NaN e se forem doutro tipo de NaN retorna false
        if (!validArgs) throw new {status:400, msg: "invalid pageNr"};
        return accountData.getAllPaged(pageNr, itemsPerPage);
    }

    function getAdvertsByUserInternal(username) {
        var currUser = accountData.get(username);
        if(currUser==null) throw {status:404, errorMsg:"This user is invalid"};
        var adverts =  advertData.getByOwner(username);

        return _(adverts).groupBy(function(ad){return ad.brand;});
    }

    function lastRegistedUser(nr){
        var users = accountData.getAll().sort(function (u){return u.registerDate;});
        if(!users) return null;

        return _.last(users,nr);
    }

	return { 
		getAll: getAllInternal,
		get: getInternal,
        add: addInternal,
        delete: deleteInternal,
        getAllPaged: getAllInternalPaged,
        getAdvertsByUser: getAdvertsByUserInternal,
        getLast: lastRegistedUser
	};
};