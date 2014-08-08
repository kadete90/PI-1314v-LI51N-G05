using System;
using System.Collections.Generic;
using System.Linq;
using DALContract;
using Model;

namespace Business_Logic_Layer
{
    public class BrandLogic
    {
        private readonly IBrandDal _dataAccess;
        public BrandLogic(IBrandDal b)
        {
            _dataAccess = b;
        }

        public IEnumerable<CarBrand> GetAllBrands(bool dummy)
        {
            var allBrands = _dataAccess.GetAll();
            if (!dummy) return allBrands;
            var carBrands = allBrands as IList<CarBrand> ?? allBrands.ToList();
            return carBrands;
        }

        public IEnumerable<CarModel> GetAllModels(string brand)
        {
            return _dataAccess.GetAllModels(brand);
        }

        public CarBrand getModelsFromBrand(string brand)
        {
            return _dataAccess.getModelsFromBrand(brand);
        }


        public string GetAllBrandsJsonToddSlick()
        {
            var brands = GetAllBrands(false);
            string json = "[";
            int i = 0;
            foreach (var carBrand in brands)
            {
                /* text: "Facebook",
        value: 1,
        selected: false,
        description: "Description with Facebook",
        imageSrc: "http://d*/
                //TODO adicionar '{' '}' à string tmp
                var tmp = "text:{0},value:{1},selected:false,description:\"\",imageSrc:\"" + @"D:\ISEL\Repositórios\1314v-LI51N-G05\AutoMobile\AutoMobile\Content\Images\CarBrands\{0}_logo.jpg";
                tmp = String.Format(tmp, carBrand.title, ++i);
                json += tmp;
            }
            json += "]";
            return json;
        }
    }
}
