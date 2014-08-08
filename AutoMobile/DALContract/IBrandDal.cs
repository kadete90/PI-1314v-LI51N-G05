using System.Collections.Generic;
using Model;


namespace DALContract
{
    public interface IBrandDal : IDal<string,CarBrand>
    {
        IEnumerable<CarModel> GetAllModels(string brand);
        IEnumerable<CarModel> GetAllModelsPaged(string brand,int pagenr, int itemsperpage);
        CarBrand getModelsFromBrand(string brand);
    }

}
