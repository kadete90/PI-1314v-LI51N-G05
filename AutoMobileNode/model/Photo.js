var should = require('should');
module.exports = function Photo(link, title) {
    arguments.length.should.be.within(1,2);
//    title.should.be.String;
    link.should.be.String;

    this.title = title || "Car Photo";
    this.link = link;
}

module.exports.prototype.setTitle = function(newTitle) { this.title = newTitle; };
module.exports.prototype.Title = function() { return this.title; };
module.exports.prototype.Link = function() { return this.link ; };