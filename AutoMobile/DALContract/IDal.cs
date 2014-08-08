using System.Collections.Generic;

namespace DALContract
{
    public interface IDal <in K,T>
    {
        bool Add(T elem);
        bool Update(T newElem);
        bool Delete(T elem);
        T GetById(K id);
        IEnumerable<T> GetAllPaged(int nrPages, int itemsPerPage);
        IEnumerable<T> GetAll();
    }
}
