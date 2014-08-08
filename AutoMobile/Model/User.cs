using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Model
{
    public class User
    {
//        public int  Id { get; private set; }
        [Required(ErrorMessage = "Username obrigatório")]
        public String Username { get; set; }
        [Required(ErrorMessage = "Password obrigatória")]
        public String Password { get; set; }
        [Required(ErrorMessage = "Email obrigatório")]
        public String Email { get; set; }
        [DataType(DataType.Currency,ErrorMessage="O valor deste campo tem de ter 9 algarismos!")]
        public int? PhoneNr  { get; set; }
        [Required(ErrorMessage = "Nome completo obrigatório")]
        public string FullName { get; set; }
        public DateTime RegisterDate { get; set; }
        [Required(ErrorMessage = "Districto obrigatório")]
        public DistrictEnum District { get; set; }

        public bool IsStand = false;
        public string StandLink { get; set; }
        public GeoLocalization GeoLocalization = null;
       
        public LinkedList<int> Ads { get; set; } //advert ids

        public User() {Ads=new LinkedList<int>();
            RegisterDate = DateTime.Now;
        }
        public User(string username, string password, string email, DistrictEnum district, String fullName, int? pnr = null)
        {
            Username = username;
            Password = password;
            Email = email;
            FullName = fullName;
            PhoneNr = pnr;
            District = district;
            Ads = new LinkedList<int>();
            RegisterDate = DateTime.Now;
        }

        //private static DateTime GetRandomDay()
        //{
        //    DateTime start = new DateTime(1900, 1, 1);
        //    int range = (DateTime.Today - start).Days;
        //    return start.AddDays(new Random().Next(range));
        //}

        public void addStandInformation(String fullAddress, String standLink)
        {
            if (!String.IsNullOrEmpty(standLink))
                StandLink = standLink;
            GeoLocalization = new GeoLocalization(fullAddress, District);
            IsStand = true;
        }

        public bool AddAdvert(int advertId)
        {
            Ads.AddLast(advertId);
            return true;
        }

    }
}