using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using Business_Logic_Layer;
using Microsoft.Ajax.Utilities;
using Model;

namespace AutoMobile.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserLogic _userLogic;
        private readonly AdvertiseLogic _advertiseLogic;

        private static readonly int AdvertsPerPage;

        static AccountController()
        {
            AdvertsPerPage = Int32.Parse(@System.Web.Configuration.WebConfigurationManager.AppSettings["AdvertsPerPage"]);
        }

        public AccountController(UserLogic s, AdvertiseLogic a)
        {
            _userLogic = s;
            _advertiseLogic = a;
        }
        //
        // GET: /Account/Login
        public ActionResult Login()
        {
            if (Request.IsAuthenticated) return RedirectToAction("Index");
            return View();
        }

        [HttpPost]
        public ActionResult Login(string username, string password, bool? remember)
        {
            if (Request.IsAuthenticated) return RedirectToAction("Index");
            var user = _userLogic.GetUserById(username);
            if ((user != null && !user.Password.Equals(password)) || user == null)
            {
                ModelState.AddModelError("Error", "User or Password incorrect");
                return View();
            }
            FormsAuthentication.SetAuthCookie(user.Username, remember.HasValue && remember.Value);
            return RedirectToAction("Index");
        }
        [HttpGet]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        //GET: /Account/Inbox
         [Authorize]
        [HttpGet]
        public ActionResult Inbox()
        {
            return View();
        }
        // GET: /Account
        [Authorize]
        [HttpGet]
        public ActionResult Index()
        {
            User u = _userLogic.GetUserById(User.Identity.Name);
            ViewBag.user = u;
            return View(u);
        }

        // GET: /Account/Manage
        [Authorize]
        public ActionResult ManageAd(int? page)
        {
            if (!page.HasValue) page = 0;
            var user = _userLogic.GetUserById(User.Identity.Name);
            ViewBag.User = user;

            return View(_advertiseLogic.GetAll()
                .Where(advert => advert.AdvertiseOwner == user.Username)
                .GroupBy(advert => advert.Brand)
                .Skip(page.Value*AdvertsPerPage).Take(AdvertsPerPage));
        }

        // GET: /Account/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Account/Create

        [HttpPost]
        public ActionResult Create(User u)
        {

            if (ModelState.IsValid)
            {
                bool added = _userLogic.AddUser(u);
                if(added)
                    return RedirectToAction("Login");
                ModelState.AddModelError("Username", "That user already exists");
            }
            return View();
           
        }

        [Authorize]
        public ActionResult Edit()
        {
            User u = _userLogic.GetUserById(User.Identity.Name);
            return View(u);
        }


        //
        // POST: /Account/Edit/username
        [Authorize]
        [HttpPost]
        public ActionResult Edit(String Password, String newPassword, string fullName, string email, int? phoneNr, DistrictEnum? district, bool? isStand, string standLink, string fullAdress)
        {
            User activeUser = _userLogic.GetUserById(User.Identity.Name);
            if (Password.IsNullOrWhiteSpace() || !activeUser.Password.Equals(Password)) //obrigatorio
            {
                ModelState.AddModelError("badPassword", "Password errada!");
                return RedirectToAction("Edit");
            }

            if (!newPassword.IsNullOrWhiteSpace() && activeUser.Password != newPassword)
                activeUser.Password = newPassword;
            if (!fullName.IsNullOrWhiteSpace() && activeUser.FullName != fullName)
                activeUser.FullName = fullName;   
            if (!email.IsNullOrWhiteSpace() && activeUser.FullName != fullName)
                activeUser.Email = email;
            if (phoneNr.HasValue && activeUser.PhoneNr != phoneNr) 
                activeUser.PhoneNr = phoneNr.Value;
            if (district.HasValue && activeUser.District != district)
                activeUser.District = district.Value;
            if (isStand.HasValue && activeUser.IsStand != isStand)
                activeUser.IsStand = isStand.Value;

            if (activeUser.IsStand) // TODO verificar se checkbox está activo
            {
                if (!standLink.IsNullOrWhiteSpace() && activeUser.StandLink != standLink)
                    activeUser.StandLink = standLink;

                if (!fullAdress.IsNullOrWhiteSpace() && activeUser.GeoLocalization.FullAdress != fullAdress)
                    activeUser.GeoLocalization.FullAdress = fullAdress;
            }

            if (!_userLogic.UpdateUser(activeUser))
                ModelState.AddModelError("AccountUpdateError", "Erro! Não foi possível editar esta conta!");
            return RedirectToAction("Index");

        }

        // POST: /Account/Delete
        [Authorize]
        [HttpPost]
        public ActionResult Delete()
        {
            if (ModelState.IsValid)
            {
                IEnumerable<int> allAdvertsOfuser = _userLogic.GetAdvertsIdsByUser(User.Identity.Name);
                foreach (int advertId in allAdvertsOfuser)
                {
                    _advertiseLogic.DeleteAdvertById(advertId);
                }
                if (_userLogic.DeleteUserById(User.Identity.Name))
                {
                    FormsAuthentication.SignOut();
                    return RedirectToAction("Index", "Home");
                }
                User u = _userLogic.GetUserById(User.Identity.Name);
                u.Ads = (LinkedList<int>) allAdvertsOfuser; //repor anúncios
                _userLogic.UpdateUser(u);
            }
            ModelState.AddModelError("Username", "Not possible delete this user");
            return RedirectToAction("Index");
        }

    }
}