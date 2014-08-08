using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AutoMobile.Models;
using Model;

namespace AutoMobile
{
    public static class MyExtensions
    {
        public static IEnumerable<Advert> FilterAdvert(this IEnumerable<Advert> a, FilterAdvertise fa)
        {
            bool year, km, price;

            var results = a.Where(advert =>
                (fa.Brand == null || advert.Brand == fa.Brand)
                && (fa.Model == null || advert.Model == fa.Model)
                && (fa.District == null || advert.Local.District == fa.District)
                && (fa.FuelType == null || advert.FuelType == fa.FuelType)
                && (year = (advert.Year >= fa.StartYear && advert.Year <= fa.EndYear))
                && (km = (advert.Kilometers >= fa.StartKm && advert.Kilometers <= fa.EndKm))
                && (price = (advert.Price >= fa.StartPrice && advert.Price <= fa.EndPrice))
                && (fa.Negotiable == false || advert.Negotiable == fa.Negotiable)
                && (fa.HasConditionAir == false || advert.Characteristics.GetElement(0).Has == fa.HasConditionAir)
                && (fa.HasAssistedDirection == false || advert.Characteristics.GetElement(1).Has == fa.HasAssistedDirection)
                && (fa.HasElectricGlass == false || advert.Characteristics.GetElement(2).Has == fa.HasElectricGlass)
                && (fa.HasElectricClose == false || advert.Characteristics.GetElement(3).Has == fa.HasElectricClose)
                && (fa.HasSoundSystem == false || advert.Characteristics.GetElement(4).Has == fa.HasSoundSystem)
                && (fa.HasAutomaticBox == false || advert.Characteristics.GetElement(5).Has == fa.HasAutomaticBox)
                && (fa.Has4WheelsTraction == false || advert.Characteristics.GetElement(6).Has == fa.Has4WheelsTraction)
            ).ToList();

            return results;

        }

        public static MvcHtmlString MyBootstrapSlider(this HtmlHelper h, string elementName, int minVal, int maxVal, string unit)
        {
            return MyBootstrapSlider(h, elementName, minVal, maxVal, "", 5, unit);
        }

        /*TODO acabar isto (usar com o ddslick http://designwithpc.com/Plugins/ddSlick) caso haja tempo
        public static MvcHtmlString MyDropDownList<T>(this HtmlHelper<T> h, string key, IEnumerable<SelectListItem> listItem)
        {
            string data= String.Format("<select class =\"form-control\" id=\"{0}\" name=\"{0}\" >", key);
                foreach (var selectListItem in listItem)
                {
                    data += String.Format("<option><i class=\"{1}_logo\">{0}</i></option>", selectListItem.Text, selectListItem.Text.ToLowerInvariant());
                }
                data += "</select>";
            return new MvcHtmlString(data);
        }*/

        //public static MvcHtmlString GetEnum(this HtmlHelper h, Enum eEnum)
        //{
        //    return from eEnum e in Enum.GetValues(typeof(eEnum)) select new { Id = e, Name = e.ToString() };
        //}


        public static T ParseEnum<T>(string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }

        public static MvcHtmlString MyBootstrapSlider(this HtmlHelper h, string elementName, object minVal, object maxVal, string symbol, int step, string unit)
        {
            string data = @"<div class=""col-sm-6 col-md-4"" >
                    <div class=""form-group sliderElement"">
                        <label>{0} {5}:</label>
                        <br />
                        <b>{1} {3}</b>
                        <div class=""slider slider-horizontal"">
                            <div class=""slider-track"">
                                <div class=""slider-selection""></div>
                                <div class=""slider-handle round""></div>
                                <div class=""slider-handle round""></div>
                            </div>
                            <div class=""tooltip top"">
                                <div class=""tooltip-arrow""></div>
                                <div class=""tooltip-inner"" id=""{0}Slider"">{1} : {2}</div>
                            </div>
                            <input type=""text"" value=""0"" class=""span2 sliderClicker"" data-slider-min=""{1}"" data-slider-max=""{2}"" data-slider-step=""{4}"" data-slider-value=""[{1},{2}]"" />
                           
                            <input type=""number"" id=""End{0}"" name=""End{0}"" class=""hidden"" value=""0"" />
                            <input type=""number"" id=""Start{0}"" name=""Start{0}"" class=""hidden"" value=""0"" />
                        </div>
                        <b> {2} {3}</b>
                    </div>
                </div>";

            return new MvcHtmlString(String.Format(data, elementName, minVal, maxVal, symbol, step, String.IsNullOrWhiteSpace(unit) ? "" : "<small>(" + unit + ")</small>"));
        }

        public static MvcHtmlString MyCharacteristics(this HtmlHelper h, string filename, string labelName,
            string checkBox)
        {
            var data = @"<div class=""col-sm-6 col-md-3"">
                        <div class=""form-group"">
                            <img class=""carCharacteristicsIcon"" src=""{0}"" alt=""{1}"">
                            <label>{1}</label>
                            {2}
                             
                        </div>
                    </div>";
            //            var dataV2 = @"<div class=""col-sm-6 col-md-3"">
            //                        <div class=""btn-group"" data-toggle=""buttons"">
            //                            <label class=""btn btn-default""> <img class=""carCharacteristicsIcon"" src=""{0}"" alt=""{1}""> {1} {2}</label
            //                        </div>
            //                    </div>";
            return new MvcHtmlString(String.Format(data, filename, labelName, checkBox));
        }
    }
}