using System.Collections.Generic;

namespace Model
{
    public class CarModel
    {
        public string value { get; set; }
        public string title { get; set; }
    }

    public class CarBrand
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