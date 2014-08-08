using System.Collections.Generic;
using Model;

namespace DALContract
{
    public interface IAdvertiseDal : IDal<int,Advert>
    {
        IEnumerable<Advert> GetAllOpen(); 
        bool AddPhoto(int id, Photo photo);
        bool AddComment(Comment comment);
        int GetMaxYear();
        int GetMinYear();
        float GetMaxPrice();
        float GetMinPrice();
        float GetMaxKm();
        float GetMinKm();
        void SetDaysUntilTerminate(int nDaysValidAfterExpired);
    }
}
