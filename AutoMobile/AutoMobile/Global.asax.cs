using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using AutoMobile.Controllers;
using Business_Logic_Layer;
using DalImplementation;

namespace AutoMobile
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            ControllerBuilder.Current.SetControllerFactory(new MyControllerFactory());

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }

    public class MyControllerFactory : DefaultControllerFactory
    {
        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            var Types = new Dictionary<Type, IController>
            {
                {
                    typeof (AdvertiseController),
                    new AdvertiseController(new AdvertiseLogic(new AdvertiseDal()), new UserLogic(new UserDal()),
                        new BrandLogic(new BrandDal()))
                },
                {
                    typeof (HomeController),
                    new HomeController(new AdvertiseLogic(new AdvertiseDal()), new UserLogic(new UserDal()))
                },
                {
                    typeof (AccountController),
                    new AccountController(new UserLogic(new UserDal()), new AdvertiseLogic(new AdvertiseDal()))
                }
            };

            return Types.Keys.Contains(controllerType) 
                ? Types[controllerType] 
                : base.GetControllerInstance(requestContext, controllerType);
        }
    }

}