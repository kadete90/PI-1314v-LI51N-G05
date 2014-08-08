var Advert = require('../model/Advert');
var Characteristics = require('../model/Characteristics');

module.exports = function(advertData) {

	function getAllInternal(){
		return advertData.getAll(); 
	};
    function getAllGroupedInternal() {
        var r = advertData.getAllGrouped();
        return r;
    }

	function getInternal(advertID) {
		if(advertID== false ||  typeof(Number(advertID)) != 'number' )
			return null;
		return advertData.get(advertID);
	};

    function addInternal(advert) {
        if (isNullOrUndefined(advert))return false;
        return advertData.add(advert);
    }

    function deleteInternal(advert) {
        if (advert == null) return false;
        return advertData.remove(advert.id);
    }

    function getAllInternalPaged(pageNr, itemsPerPage) {
        var validArgs = Number(pageNr) !==NaN && Number(itemsPerPage) !==NaN; //compara se so estritamente diferentes de NaN e se forem doutro tipo de NaN retorna false
        if (!validArgs) throw "invalid Args on AccountLogic getAllInternalPaged";
        return advertData.getAllPaged(pageNr, itemsPerPage);
    }

    function betterRating(nr){
        var adverts = advertData.getAll().sort(function (advert){return advert.averageRate;});
        if(!adverts) return null;
        return _.last(adverts,nr);
    }

    function addAdvertInternal(title, brand, model,version, year, km, fuelType, geoLocation, owner, price, negotiable, valDate, characteristics, description){
        var enuma = ["Gasolina 95", "Gasolina 98", "Gasóleo", "Diesel", "Gás Natural", "Etanol", "Bio Diesel"];
        var fuel = enuma[fuelType];
        var date = new Date();
        var char = new Characteristics(characteristics);
        date.setMonth(11);


        var advert = new Advert(title, brand, model,version, parseInt(year), parseInt(km), fuel, geoLocation, owner, parseInt(price), negotiable, date, char, description);
        advertData.add(advert);//
        return advert.id;
    }

    function verifyInternal(params){

        /*var trans = ["Ar+Condicionado", "Caixa+Autom%C3%A1tica" , "Direc%C3%A7%C3%A3o+Assistida", "Fecho+El%C3%A9ctrico",
            "Negociavel", "Sistema+de+som", "Trac%C3%A7%C3%A3o+%C3%A0s+4+Rodas", "Vidros+El%C3%A9ctricos"];
        */

        var data = [];
        var adverts = advertData.getAll();

        for(var j = 0; j <adverts.length; j++) {

            if(params.Brand == adverts[j].brand || params.Brand == ""){

            }else break;
            if(params.Model == adverts[j].model || params.Model == ""){

            }else break;
            if(params.District == adverts[j].district || params.District == ""){

            }else break;
            if((params.EndKm==0?400000:params.EndKm) >= adverts[j].km && params.StartKm <= adverts[j].km){

            }else break;
            if((params.EndPrice==0?100000:params.EndPrice) >= adverts[j].price && params.StartPrice <= adverts[j].price){

            }else break;
            if((params.EndYear==0?2014:params.EndYear) >= adverts[j].year && params.StartYear <= adverts[j].year){

            }else break;
            if(params.FuelType == adverts[j].fuelType || params.FuelType == ""){

            }else break;
            if(params.Negotiable == adverts[j].negotiable || params.Negotiable == undefined){

            }else break;

            data.push(adverts[j]);
        }

        return data;

    }

    function addInternalComment(advert, comment){
        advert.comments.push(comment);
        advert.comments.push();
    }

	return { 
		getAll: getAllInternal,
        getAllGrouped: getAllGroupedInternal,
		get: getInternal,
        add: addInternal,
        addAdvert: addAdvertInternal,
        delete: deleteInternal,
        getAllPaged: getAllInternalPaged,
        getLast: betterRating,
        verify: verifyInternal,
        addComment: addInternalComment
	};
};