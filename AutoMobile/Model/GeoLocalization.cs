using System.Device.Location;

namespace Model
{
    public class GeoLocalization
    {
        public string FullAdress { get; set; }
        public GeoCoordinate Coordinate { get; set; }
        public DistrictEnum District { get; set; }
        public bool hasCoordinate = false;
        public GeoLocalization()
        {
            Coordinate = new GeoCoordinate(38.7556861, -9.1162312);
            hasCoordinate = true;
        }
        public GeoLocalization(string fullLocation, DistrictEnum district)
        {
            //if (FullAdress != null && FullAdress != "") 
                // => Reverse GeoCoordinate
                // Coordinate = new GeoCoordinate(latitude, longitude);
                District = district;
                FullAdress = fullLocation;
        }
    }
}