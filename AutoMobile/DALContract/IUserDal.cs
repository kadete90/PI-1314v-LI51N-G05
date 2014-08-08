using System;
using System.Collections.Generic;
using Model;

namespace DALContract
{
    public interface IUserDal : IDal<String,User>
    {
        bool AssociateAdvert(int adId, String username);
        IEnumerable<int> GetAdvertsIdsByUser(String username);
    }
}
