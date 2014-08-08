using System;
using System.Collections.Generic;
using System.Linq;
using DALContract;
using Model;

namespace DalImplementation
{
    public class AdvertiseDal : IAdvertiseDal
    {
        private static readonly Dictionary<int,Advert> Adverts = new Dictionary<int, Advert>();
        private static readonly Dictionary<int, Advert> TerminateAdverts = new Dictionary<int, Advert>();
        private static int DaysToTerminate;

        static AdvertiseDal()
        {
            Adverts.Clear();
            TerminateAdverts.Clear();

            Random r = new Random();
            var validDate = DateTime.UtcNow;
            var unValidDateToExpire = DateTime.Now.Subtract(TimeSpan.FromDays(DaysToTerminate - 1));
            var unValidDateToTerminate = DateTime.Now.Subtract(TimeSpan.FromDays(DaysToTerminate + 1));

            var PCayman = new Advert("", "Porsche", "Cayman", "S", 2014, r.Next(400), FuelTypeEnum.Gasolina_95, new GeoLocalization("Lisboa",DistrictEnum.Lisboa),
                "User2", 60, true, validDate.AddDays(r.Next(1, 60)), new Characteristics(new[] { false, false, false, true, false, false, false }));      
            for (int i = 0; i <= 10;){
                var photo = new Photo("porschecayman.jpg");
                photo.setPhotoName("Porche Cayman S: "+ i++);
                PCayman.AddPhoto(photo);
            }   
            Add(PCayman);
            var jaguar = new Advert("", "Jaguar", "F-Type", "", 2011, r.Next(400), FuelTypeEnum.Gasolina_98, new GeoLocalization("Porto", DistrictEnum.Porto),
                "User1", 50, true, validDate.AddDays(r.Next(1, 60)), new Characteristics(new[] { false, true, false, false, false, false, false }));
                jaguar.AddPhoto(new Photo("jaguarftype.jpg"));
            jaguar.Status = AdvertStatusEnum.Cancelado;
            Add(jaguar);

            var jaguar2 = new Advert("", "Jaguar", "F-Type", "", 2010, r.Next(400), FuelTypeEnum.Gasolina_95, new GeoLocalization("Porto", DistrictEnum.Porto),
                "User4", 50, true, validDate.AddDays(r.Next(1, 60)), new Characteristics(new[] { false, true, false, false, false, false, false }));
            jaguar2.AddPhoto(new Photo("jaguarftype.jpg"));
            jaguar2.Status = AdvertStatusEnum.Expirado;
            Add(jaguar2);

            var P911 = new Advert("", "Porsche", "911", "", 2014, r.Next(400), FuelTypeEnum.Diesel, new GeoLocalization("Lisboa", DistrictEnum.Lisboa),
                "User1", 90, false, validDate.AddDays(r.Next(1, 60)), new Characteristics(new[] { true, false, true, false, true, false, false }));
                P911.AddPhoto(new Photo("porsche911.jpg"));
            Add(P911);

            //--------------------------------------------------//
            var nissanExpired = new Advert("", "Nissan", "GT-R", "", 2012, r.Next(400), FuelTypeEnum.Gasóleo, new GeoLocalization("Porto", DistrictEnum.Porto),
                "User1", 140, true, unValidDateToExpire, new Characteristics(new[] { true, false, true, false, true, false, false }), "'Teste': Anúncio expirado");
            nissanExpired.AddPhoto(new Photo("nissangtr.jpg"));
            nissanExpired.Status = AdvertStatusEnum.Expirado;
            Add(nissanExpired);

            var nissanTerminated = new Advert("", "Nissan", "GT-R", "", 2013, r.Next(400), FuelTypeEnum.Gasóleo, new GeoLocalization("Aveiro", DistrictEnum.Aveiro),
                "User1", 200, true, unValidDateToTerminate, new Characteristics(new[] { true, false, true, true, true, true, false }), "'Teste': Anúncio terminado");
            nissanTerminated.AddPhoto(new Photo("nissangtr.jpg"));
            nissanTerminated.AddPhoto(new Photo("nissangtr.jpg"));
            nissanTerminated.Status = AdvertStatusEnum.Terminado;
            Add(nissanTerminated);
            
            //--------------------------------------------------//
            var lotus = new Advert("", "Lotus", "Evora", "", 2014, r.Next(400), FuelTypeEnum.Gasolina_95, new GeoLocalization("Lisboa", DistrictEnum.Lisboa),
                "User3", 50, false, validDate.AddDays(r.Next(1, 60)), new Characteristics(new[] { true, true, false, false, true, false, false }));
                lotus.AddPhoto(new Photo("lotusevora.jpg"));
            Add(lotus);
            var rollsroyce = new Advert("", "Rolls Royce", "Phantom EWB", "", 2004, r.Next(400), FuelTypeEnum.Gasolina_98, new GeoLocalization("Faro", DistrictEnum.Faro),
                "User1", 70, false, validDate.AddDays(r.Next(1, 60)), new Characteristics(new[] { false, true, false, false, false, true, true }));
            rollsroyce.AddPhoto(new Photo("rollsroycephantom.jpg"));
            Add(rollsroyce);
        }

        public static bool Add(Advert elem)
        {
            if (elem == null || !checkYear(elem.Year) || !checkKm(elem.Kilometers) || !checkPrice(elem.Price))
                return false;
            Adverts.Add(elem.Id, elem);
            return true;
        }

        bool IDal<int, Advert>.Add(Advert elem)
        {
            return Add(elem);
        }

        public bool Update(Advert newElem)
        {
            if (newElem == null || !checkYear(newElem.Year) || !checkKm(newElem.Kilometers) || !checkPrice(newElem.Price))
                return false;
            if (Adverts.ContainsKey(newElem.Id))
                Adverts[newElem.Id] = newElem;
            else if (TerminateAdverts.ContainsKey(newElem.Id))
                TerminateAdverts[newElem.Id] = newElem;
            return true;
        }

        public bool Delete(Advert elem)
        {
            bool deleted;
            if (elem.Status == AdvertStatusEnum.Ativo || elem.Status == AdvertStatusEnum.Expirado)
                deleted = Adverts.Remove(elem.Id);   
            else
                deleted = TerminateAdverts.Remove(elem.Id);          
            return deleted;
        }

        public Advert GetById(int id)
        {
            return Adverts.ContainsKey(id) 
                ? Adverts[id]
                : TerminateAdverts.ContainsKey(id)
                    ? TerminateAdverts[id]
                    : null;
        }

        public IEnumerable<Advert> GetAllPaged(int nrPages, int itemsPerPage)
        {
            return Adverts.Values.Skip(nrPages * itemsPerPage).Take(itemsPerPage);
        }

        public IEnumerable<Advert> GetAll()
        {
            List<int> activesToRemove = new List<int>();
            foreach (KeyValuePair<int, Advert> advert in Adverts.Where(advert => advert.Value.ValidUntil.Date <= DateTime.Now))
            {
                if (advert.Value.ValidUntil.AddDays(DaysToTerminate).Date <= (DateTime.Now))
                {
                    TerminateAdverts.Add(advert.Key, advert.Value);
                    activesToRemove.Add(advert.Key);
                    advert.Value.Status = AdvertStatusEnum.Terminado;
                }
                else
                    advert.Value.Status = AdvertStatusEnum.Expirado;
            }
            foreach (int id in activesToRemove)
                Adverts.Remove(id);

            return Adverts.Values.Concat(TerminateAdverts.Values);
        }

        public IEnumerable<Advert> GetAllOpen()
        {
            return GetAll().Where(a => a.Status == AdvertStatusEnum.Ativo || a.Status == AdvertStatusEnum.Expirado);
        }

        public bool AddPhoto(int id, Photo photo)
        {
            Advert a = GetById(id);
            return a != null && a.AddPhoto(photo);
        }

        public bool AddComment(Comment comment)
        {
            Advert ad = GetById(comment.AdId);
            if (ad.Status == AdvertStatusEnum.Terminado || ad.Status == AdvertStatusEnum.Cancelado)
                return false;
            return Adverts[ad.Id].AddComment(comment);
        }

        private static float MinPrice { get; set; }
        private static float MaxPrice { get; set; }

        private static float MinKm { get; set; }
        private static float MaxKm { get; set; }

        private static int MinYear { get; set; }
        private static int MaxYear { get; set; }

        private static bool checkPrice(float price)
        {
            if(price < 0) return false;
            if (price < MinPrice || MinPrice.Equals(0)) MinPrice = price;
            else if (price > MaxPrice) MaxPrice = price;
            return true;
        }

        private static bool checkKm(float kilometers)
        {
            if (kilometers < 0) return false;
            if (kilometers < MinKm || MinKm.Equals(0)) MinKm = kilometers;
            else if (kilometers > MaxKm) MaxKm = kilometers;
            return true;
        }

        private static bool checkYear(int year)
        {
            if (year < 1800 || year > DateTime.Now.Year) return false;
            if (year < MinYear || MinYear.Equals(0)) MinYear = year;
            else if (year > MaxYear) MaxYear = year;
            return true;
        }

        public int GetMaxYear()
        {
            return MaxYear;
        }

        public int GetMinYear()
        {
            return MinYear;
        }

        public float GetMaxPrice()
        {
            return MaxPrice;
        }

        public float GetMinPrice()
        {
            return MinPrice;
        }

        public float GetMaxKm()
        {
            return MaxKm;
        }

        public float GetMinKm()
        {
            return MinKm;
        }

        public void SetDaysUntilTerminate(int nDaysValidAfterExpired)
        {
            DaysToTerminate = nDaysValidAfterExpired;
        }
    }
}
