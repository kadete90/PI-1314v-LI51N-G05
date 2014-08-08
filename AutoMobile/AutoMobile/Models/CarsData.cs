using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AutoMobile.Models
{
    public class CarModel
    {
        public string value { get; set; }
        public string title { get; set; }
    }

    public class RootObject
    {
        public string value { get; set; }
        public string title { get; set; }
        public List<CarModel> models { get; set; }

        public override string ToString()
        {
            return title;
        }
    }

}