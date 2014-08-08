using System;
using System.Collections.Generic;
using System.Linq;
using DALContract;
using Model;

namespace DalImplementation
{
    public class UserDal : IUserDal
    {
        private static readonly Dictionary<String, User> Users = new Dictionary<string, User>();

        static UserDal()
        {
            int i = 0;
            const string name = "User";
            const string fullname = "João Constantino ";

            AdvertiseDal advertiseDal = new AdvertiseDal();

            User user0 = new User(name + i, "123", "automobilemailservice@gmail.com", DistrictEnum.Lisboa, fullname + i, 910000000 + i);
            Users.Add(name + i++, user0);
            User user1 = new User(name + i, "123", "fkadete@gmail.com", DistrictEnum.Lisboa, fullname + i, 910000000 + i);
            foreach (var advert in advertiseDal.GetAll())
                user1.AddAdvert(advert.Id);
            Users.Add(name + i++, user1);
            User user2 = new User(name + i, "123", "andrepinto11@hotmail.com", DistrictEnum.Madeira, fullname + i, 910000000 + i);
            Users.Add(name + i++, user2);
            User user3 = new User(name + i, "123", "fkadete@gmail.com", DistrictEnum.Porto, fullname + i, 910000000 + i);
            Users.Add(name + i++, user3);
            User user4 = new User(name + i, "123", "automobilemailservice@gmail.com", DistrictEnum.Coimbra, fullname + i, 910000000 + i);
            Users.Add(name + i++, user4);
            User user5 = new User(name + i, "123", "automobilemailservice@gmail.com", DistrictEnum.Lisboa, fullname + i, 910000000 + i);
            Users.Add(name + i, user5);                       
        }

        public bool Add(User elem)
        {
            if (elem == null) return false;
            Users.Add(elem.Username, elem);
            return true;
        }

        public bool Update(User newElem)
        {
            if (newElem == null) return false;
            Users[newElem.Username] = newElem;
            return true;
        }

        public bool Delete(User elem)
        {
            return Users.ContainsValue(elem) && Users.Remove(elem.Username);
        }

        public User GetById(string id)
        {
            return Users.ContainsKey(id) ? Users[id] : null;
        }

        public IEnumerable<User> GetAllPaged(int nrPages, int itemsPerPage)
        {
            return GetAll().Skip(nrPages * itemsPerPage).Take(itemsPerPage);
        }

        public IEnumerable<User> GetAll()
        {
            return Users.Values;
        }

        public bool AssociateAdvert(int adID, string username)
        {
            User u = Users.ContainsKey(username) ? Users[username] : null;
            return u != null && u.AddAdvert(adID);
        }

        public IEnumerable<int> GetAdvertsIdsByUser(string username)
        {
            return Users.ContainsKey(username) ? Users[username].Ads : null;
        }
    }
}
