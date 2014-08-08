

var constructorAjax = function(brandLogic,advertLogic){

    function getModelsFromBrands(req,res){
        var modelsFromBrand = brandLogic.getAllModels(req.params.brandName);
        res.render("../views/templates/PartialDropdownModels.ejs",{layout:false,models:modelsFromBrand})
    }

    return { ModelsFromBrand: getModelsFromBrands}
}


module.exports = constructorAjax;