using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web.Script.Serialization;
using DALContract;
using Model;

namespace DalImplementation
{
    public class BrandDal:IBrandDal
    {
        private static readonly Dictionary<String,CarBrand> data ;
        static BrandDal()
        {
            string [] path = new string[4];
            path[0] ="D:\\ISEL\\Repositórios\\1314v-LI51N-G05\\AutoMobile\\AutoMobile\\Content\\cars.json";
            path[1] ="C:\\Users\\André Pinto\\Documents\\ISEL\\PI\\1314v-LI51N-G05\\AutoMobile\\AutoMobile\\Content\\cars.json";
            path[2] ="D:\\ISEL\\13_14SVer\\PI\\1314v-LI51N-G05\\AutoMobile\\AutoMobile\\Content\\cars.json";
            path[3] ="C:\\Users\\Andre\\Documents\\ISEL\\PI\\1314v-LI51N-G05\\AutoMobile\\AutoMobile\\Content\\cars.json";
            string temp = path.FirstOrDefault(File.Exists);
            Debug.Assert(temp!=null);
            var jsondata = File.ReadAllText(temp);
            //
            var serializer = new JavaScriptSerializer();
            data = serializer.Deserialize<List<CarBrand>>(jsondata).ToDictionary(model => model.title);
        }

        public CarBrand getModelsFromBrand(string brand)
        {
            CarBrand carBrand;
            data.TryGetValue(brand, out carBrand);
            return carBrand;
        }

        public bool Add(CarBrand elem)
        {
            throw new NotImplementedException();
        }

        public bool Update(CarBrand newElem)
        {
            throw new NotImplementedException();
        }

        public bool Delete(CarBrand elem)
        {
            // Confirmar se a chave de Brand é title
            return data.ContainsValue(elem) && data.Remove(elem.title);
        }

        public CarBrand GetById(string id)
        {
            return data.ContainsKey(id)?data[id]:null;
        }

        public IEnumerable<CarBrand> GetAllPaged(int nrPages, int itemsPerPage)
        {
            return data.Values.Skip(nrPages*itemsPerPage).Take(itemsPerPage);
        }

        public IEnumerable<CarBrand> GetAll()
        {
            return data.Values;
        }

        public IEnumerable<CarModel> GetAllModels(string brand)
        {
            return data.ContainsKey(brand)?data[brand].models:null;
        }

        public IEnumerable<CarModel> GetAllModelsPaged(string brand, int nrPages, int itemsperpage)
        {
            return data.ContainsKey(brand)
                ? data[brand].models.Skip(nrPages*itemsperpage).Take(itemsperpage)
                : null;
        }
    }
}
