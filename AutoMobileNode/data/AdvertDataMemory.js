
var Advert = require('../model/Advert');
var Characteristics = require('../model/Characteristics');
var Photo = require('../model/Photo');

var random = function(limitSup, limitInf) {
    limitInf = isNaN(Number(limitInf)) ? 1 : limitInf;
    return Math.floor((Math.random() * limitSup) + (limitInf));
};

function randomFuelType() {
    var fuelTypes = enums.FuelType();
     return fuelTypes[random(fuelTypes.length-1, 0)];
};

function getInitialAdverts() {
    var t = [];
    var date = new Date();
    date.setMonth(11);
    var location = { city: "Porto" };

    
    var PCayman = new Advert("", "Porsche", "Cayman", "S", 2014, random(400), randomFuelType(), location,
        "User1", 60000, true, date, new Characteristics(3), "Grande Carro, vrum vrum");
    var x = new Photo("porschecayman.jpg", "Porche Cayman S");
    PCayman.AddPhoto(new Photo("porschecayman.jpg","Porche Cayman S"));
    t.push(PCayman);
    PCayman.AddComments({user: "User1", rating: 4, text: "Gostei muito mesmo"});
    PCayman.AddComments({user: "User2", rating: 5, text: "WAOW"});


    var jaguar = new Advert("", "Jaguar", "F-Type", " ", 2014, random(400), randomFuelType(), location,
        "User1", 80000, true, date, new Characteristics(2,4), "Grande Carro, vrum vrum");
    jaguar.AddPhoto(new Photo("jaguarftype.jpg" ));
//            jaguar.Status = AdvertStatusEnum.Cancelado;
    t.push(jaguar);
    jaguar.AddComments("Fantastico!!!");

    var P911 = new Advert("", "Porsche", "911", "", 2014, random(400), randomFuelType(),location,
        "User1", 90000, false, date, new Characteristics(0,2,4),"Grande Carro, vrum vrum");
    P911.AddPhoto(new Photo("porsche911.jpg" ));
    t.push(P911);

    var nissan = new Advert("", "Nissan", "GT-R", "", 2014, random(400), randomFuelType(), location,
        "User1", 140000, true, date, new Characteristics(true, false, true, false, true, false, false), "Grande Carro, vrum vrum");
    nissan.AddPhoto(new Photo("nissangtr.jpg" ));
    t.push(nissan);

    var lotus = new Advert("", "Lotus", "Evora", "", 2014, random(400), randomFuelType(), location,
        "User1", 50000, false, date, new Characteristics(true, true, false, false, true, false, false), "Grande Carro, vrum vrum");
    lotus.AddPhoto(new Photo("lotusevora.jpg" ));
    t.push(lotus);

    var rollsroyce = new Advert("", "Rolls Royce", "Phantom EWB", "", 2014, random(400), randomFuelType(), location,
        "User1", 500000, false, date, new Characteristics(false, true, false, false, false, true, true), "Grande Carro, vrum vrum");
    rollsroyce.AddPhoto(new Photo("rollsroycephantom.jpg" ));
    t.push(rollsroyce);
    
    

    return t;
}

module.exports = function() {
    var adverts = getInitialAdverts();

    function getAllInternal() {
        return adverts;
    };

    function getAllGroupedInternal() {
        return _(adverts).groupBy(function(ad) { return ad.brand; } 
        );
    };

    function getInternalByOwner(owner) {
        return _(adverts).where(function(ad) { return ad.owner === owner; });
    };

    function getInternal(id) {
        return _(adverts).findWhere ({ id: Number(id)});

    };

    function addInternal(advert){
        return adverts.push(advert);
    };

    function removeInternal(id){
        var place = -1;
        for (var i = 0; i < adverts.length; i++) {
            if(adverts[i].id==id)
                place = i;
        }
        return adverts.splice(place,1);
    };

    return {
        getAll: getAllInternal,
        getAllGrouped:getAllGroupedInternal,
        get: getInternal,
        getByOwner: getInternalByOwner,
        add: addInternal,
        remove: removeInternal
    };
};

