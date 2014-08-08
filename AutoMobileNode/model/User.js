

var noneIsNullOrUndefined = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == null) //checks if is null or undefined
            return false;
    }
    return true;
}
var ConstructorUser = function User( username,  password,  fullName,  email,  phone,  district ,isStand,standLink) {
    

var isValid = function validateUser() {
        var res = noneIsNullOrUndefined( arguments);
        if (!res) return false;
        res = res && (typeof username == 'string');        
        return res;
    }(arguments);
    if (!isValid) throw "notValid";

    var now = new Date();

    this.username = username;
    this.password = password;
    this.email = email;
    this.fullName = fullName;
    this.phoneNr = phone;
    this.district = district;
    this.registerDate = now.getDate();
    this.geoLocalization = null;
    this.isStand = isStand || false;
    if(this.isStand) this.standLink = standLink;
}


ConstructorUser.prototype.Username = function() { return this.username; };
ConstructorUser.prototype.Password = function() { return this.password; };
ConstructorUser.prototype.Email = function() { return this.email; };
ConstructorUser.prototype.Fullname = function() { return this.fullName; };
ConstructorUser.prototype.PhoneNr = function() { return this.phoneNr; };
ConstructorUser.prototype.District = function() { return this.district; };
ConstructorUser.prototype.AddAd = function(a) { this.photos.push(a); };
ConstructorUser.prototype.RegisterDate = function() { return this.registerDate; };
ConstructorUser.prototype.GeoLocalization = function() { return this.geoLocalization; };
ConstructorUser.prototype.IsStand = function() { return this.isStand; };
ConstructorUser.prototype.StandLink = function() { return this.standLink || null; };


module.exports=ConstructorUser;


    


