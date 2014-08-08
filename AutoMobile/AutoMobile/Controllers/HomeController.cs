using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Business_Logic_Layer;
using Model;

namespace AutoMobile.Controllers
{
    public class HomeController : Controller
    {
        private readonly AdvertiseLogic _advertLogic;
        private readonly UserLogic _userLogic;
        private static readonly int AdvertsPerPage;

        static HomeController()
        {
            AdvertsPerPage = Int32.Parse(@System.Web.Configuration.WebConfigurationManager.AppSettings["AdvertsPerPage"]);
        }

        public HomeController(AdvertiseLogic s,UserLogic l)
        {
            _advertLogic = s;
            _userLogic = l;
        }

        // GET: /Home/

        public ActionResult Index()
        {
            var lastXAdverts = _advertLogic.GetAllOpen().Take(AdvertsPerPage);
            var lastXUsers = _userLogic.GetAll().OrderByDescending(user => user.RegisterDate).Take(AdvertsPerPage);
            var data = new Tuple<IEnumerable<Advert>, IEnumerable<User>>(lastXAdverts,lastXUsers);
            return View("Index", data);
        }

    }
}
