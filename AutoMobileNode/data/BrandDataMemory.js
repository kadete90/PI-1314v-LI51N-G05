 
 


 function getInitialBrands() {
     var fs = require('fs');
    var brands = require(__mybasedir + '/model/Brands');

     var data = fs.readFileSync(__mybasedir + "/public/cars.json");
     var read = JSON.parse(data);
     var res = [];
     for (var i = 0; i < read.length;i++) {
         var elem = read[i];
         res.push(new brands(elem.title, elem.value, elem.models));
     }
     
     return res;
 }
 
module.exports = function() {
	var brands = getInitialBrands();
	
	function getAllInternal(){
		return brands; 
	};

	function getAllBrandsInternal() {
	    return _(brands).map(function(b) { return {title: b.title, value:b.value}; });
	};

    function getAllModelsFromBrandInteral(brand) {
        return _(brands).where(function(b) { return b.value === brand; }).map(function(data) { return data.models; });
    }
    function getBrandByName(brandName) {
        return _(brands).find(function (b) {
            return b.title === brandName;
        });
    }
	return { 
		getAll: getAllInternal,
            getAllBrands: getAllBrandsInternal,
            getAllModels: getAllModelsFromBrandInteral,
            get: getBrandByName
	};
};

