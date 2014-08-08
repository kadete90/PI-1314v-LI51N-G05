module.exports= function Brand(title, value, models) {
    title.should.be.String;
    value.should.be.String;
    models.should.be.Array;

    this.title = title;
    this.value = value;
    this.models = models;


    this.getModels = function() { return this.models; };
    this.getTitle = function() { return this.title; };
    this.getValue = function() { return this.value; };
}