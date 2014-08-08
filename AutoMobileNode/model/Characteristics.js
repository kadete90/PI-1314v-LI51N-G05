var names = ["Ar condicionado", "Direcção Assistida", "Vidro elétrico", "Fecho elétrico", "Sistema de som", "Caixa Automática", "Tracção às 4 rodas"];

var Charact = function Characteristics() {
    var characteristics = [
        { exist: false, description: names[0] }, { exist: false, description: names[1] }, { exist: false, description: names[2] },
        { exist: false, description: names[3] }, { exist: false, description: names[4] }, { exist: false, description: names[5] },
        { exist: false, description: names[6] }
    ];
    if (arguments.length > characteristics.length) throw new Error('Invalid parameters creating a NEW characteristics! You must pass vararg [0..7[ where the number means the characteristic you want. The input can be numbers or boolean');

    for (var i = 0; i < arguments.length; i++) {
        var input = arguments[i]; //Input can be a boolean or a number indication the index that will be available
        if (input.constructor == Number) {
            input.should.be.within(0, characteristics.length-1); // within = [p1,p2]
            characteristics[input] = { exist: true, description: names[input] };
        } else if (input.constructor == Boolean)
            characteristics[i].exist = input;
        }
        Object.freeze(characteristics) ;

    this.Values= function(){ return characteristics;}
}


Charact.prototype.Descriptions = names;

module.exports = Charact;
