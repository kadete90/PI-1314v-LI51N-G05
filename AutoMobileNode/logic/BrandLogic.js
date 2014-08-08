
module.exports = function(brandData) {

    function GetAllBrandsInternal() {
        return Object.freeze(brandData.getAllBrands());
    }

    function GetAllInternal(){
        return Object.freeze(brandData.getAll());
    }

    function GetAllModelsInternal(brandName){
        brandName.should.be.String;
        var brand = brandData.get(brandName);
        if(!brand) throw new Error('Brand ' + brandName + ' does not exist !');
        return Object.freeze(brand.models);
    }
    function GetInternal(brandName){
        brandName.should.be.String;
        return Object.freeze(brandData.get(brandName));
    }
    return {getAll: GetAllInternal, getAllModels : GetAllModelsInternal,get:GetInternal,getAllBrands:GetAllBrandsInternal}
};