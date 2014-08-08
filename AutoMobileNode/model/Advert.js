var should = require('should');
var photo = require('../model/Photo');
var defaultPhoto = new photo("placeholder1.png","Placeholder");
var statusModes = (new (require('./Enums'))).StatusModes();

var noneIsNullOrUndefined = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == null) //checks if is null or undefined
            throw new Error("Parameters  " + i + " on advertise is not valid");
    }
}

var ConstructorAdvertise = function Advertise(title, brand, model,version, year, km, fuelType, geoLocation, owner, price, negotiable, valDate, characteristics, description) {

    var _privateID = function(e) {
        if(e.prototype.staticID=== undefined) e.prototype.staticID = 0;
        return function() {
            return e.prototype.staticID+=1;
        }
    }(ConstructorAdvertise); // aproveitar captura de contexto para defenir um idInterno auto incremental por cada criacao de novo obj esse id esta disponivel no prototype
    var currentDate = new Date();

    noneIsNullOrUndefined(title, brand, model, year, km, fuelType, geoLocation, owner, price, negotiable, valDate, characteristics, description);

    year.should.be.a.Number.and.be.within(1950, currentDate.getFullYear());
    title.should.be.a.String;
    negotiable.should.be.a.Boolean;
    valDate.should.be.an.instanceof(Date);
    valDate.getTime().should.be.above(currentDate.getTime());
    price.should.be.a.Number.and.be.above(0);
    km.should.be.a.Number.and.be.above(0);
    characteristics.constructor.name.should.be.equal('Characteristics');

    this.version = "DEFAULT";

    this.id = _privateID();
    this.title = title;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.km = km;
    this.fuelType = fuelType;
    this.geoLocation = geoLocation;
    this.owner = owner;
    this.price = price;
    this.negotiable = negotiable;
    this.valDate = valDate;
    this.characteristics = characteristics;
    this.description = description;
    this.photos = [];
    this.status = [0];
    this.comments = [];
    this.averageRate = 0;
    this.status = statusModes[0];
}


ConstructorAdvertise.prototype.Id = function() { return this.id; };
ConstructorAdvertise.prototype.Title = function() {
    var res = this.title;

    if (isNullOrEmpty(res) ){
        res = this.brand + " " + this.model + ((this.version !=null)?" " + this.version:"");
    }
    console.log("title " + res);
    return res; };

ConstructorAdvertise.prototype.ValidUntil = function(){ return this.valDate;};
ConstructorAdvertise.prototype.Brand = function() { return this.brand; };
ConstructorAdvertise.prototype.Model = function() { return this.model; };
ConstructorAdvertise.prototype.Version = function() { return this.version; };
ConstructorAdvertise.prototype.Year = function() { return this.year; };
ConstructorAdvertise.prototype.Km = function() { return this.km; };
ConstructorAdvertise.prototype.FuelType = function() { return this.fuelType; };
ConstructorAdvertise.prototype.GeoLocation = function() { return this.geoLocation; };
ConstructorAdvertise.prototype.Owner = function() { return this.owner; };
ConstructorAdvertise.prototype.Price = function() { return this.price; };
ConstructorAdvertise.prototype.Negotiable = function() { return this.negotiable; };
ConstructorAdvertise.prototype.ValDate = function() { return this.valDate; };
ConstructorAdvertise.prototype.Characteristics = function() { return this.characteristics; };
ConstructorAdvertise.prototype.Description = function() { return this.description; };
ConstructorAdvertise.prototype.Photos = function() { return this.photos;};
ConstructorAdvertise.prototype.DefaultPhoto = function(){
    if(! this.photos || this.photos.length==0) return defaultPhoto;
    return this.photos[this.photos.length-1];
}
ConstructorAdvertise.prototype.AddPhoto = function(p) {
    p.constructor.name.should.be.equal('Photo');
    this.photos.push(p);
};
ConstructorAdvertise.prototype.Status = function() { return this.status; };
ConstructorAdvertise.prototype.AddComments = function(c) { this.comments.push(c); };
ConstructorAdvertise.prototype.AverageRate = function() { return this.averageRate; };
ConstructorAdvertise.prototype.statusModes = new StatusMode();

function StatusMode() {
    return Object.freeze(["Ativo", "Expirado", "Cancelado"]);
}
module.exports = ConstructorAdvertise;



