using System;
using Model;

namespace AutoMobile.Models
{
    public class FilterAdvertise
    {
        internal const int Unit = 1000; //milhares
        public String Brand { get; set; }
        public String Model { get; set; }

        public int StartYear { get; set; }
        public int EndYear { get; set; }

        public int StartKm  { get; set; }
        public int EndKm { get; set; }

        public int StartPrice { get; set; }
        public int EndPrice { get; set; }
        
        public bool Negotiable { get; set; }
        public bool HasConditionAir { get; set; }
        public bool HasAssistedDirection { get; set; }
        public bool HasElectricGlass { get; set; }
        public bool HasElectricClose { get; set; }
        public bool HasSoundSystem { get; set; }
        public bool HasAutomaticBox { get; set; }
        public bool Has4WheelsTraction { get; set; }
        public DistrictEnum? District { get; set; }
        public FuelTypeEnum? FuelType { get; set; }
    }
}