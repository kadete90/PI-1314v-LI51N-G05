using System.Collections.Generic;
using DALContract;
using Model;

namespace Business_Logic_Layer
{
    public class UserLogic
    {
        private readonly IUserDal _dataAcess;
        public UserLogic(IUserDal userDal)
        {
            _dataAcess = userDal;
        }

        public IEnumerable<User> GetAll()
        {
            return _dataAcess.GetAll();
        }

        public IEnumerable<User> GetAllByPage(int page, int itemperpage)
        {
            return _dataAcess.GetAllPaged(page, itemperpage);
        }

        public User GetUserById(string username)
        {
            return _dataAcess.GetById(username);
        }

        public IEnumerable<int> GetAdvertsIdsByUser(string username)
        {
            return _dataAcess.GetAdvertsIdsByUser(username);
        }

        public bool UpdateUser(User u)
        {
            return _dataAcess.Update(u);
        }

        public bool AddUser(User u)
        {
            return _dataAcess.Add(u);
        }

        public bool AssociateAdvertToUser(int adId,string username)
        {
            return _dataAcess.AssociateAdvert(adId,username);
        }

        public bool DeleteUser(User u)
        {
            return _dataAcess.Delete(u);
        }

        public bool DeleteUserById(string username)
        {
            return _dataAcess.Delete(_dataAcess.GetById(username));
        }

    }
}
