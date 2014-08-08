
var createEnums = function myEnums(){
    var dist =  Object.freeze(['Aveiro','Beja','Braga','Bragança','Castelo Branco','Coimbra',
        'Évora','Faro','Guarda','Leiria','Lisboa','Portalegre','Porto','Santarém',
        'Setúbal','Viana do Castelo','Vila Real','Viseu']);

    var fuel = Object.freeze(["Gasolina 95", "Gasolina 98", "Gasóleo", "Diesel", "Gás Natural", "Etanol", "Bio Diesel"]);
    var status = Object.freeze(["Ativo", "Expirado", "Cancelado"]);

    this.Districts = function(){return dist;};

    this.FuelType = function(){return fuel;};

    this.StatusModes = function(){return status;};
}

module.exports = createEnums;