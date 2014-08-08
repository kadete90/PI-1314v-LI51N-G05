using System;
using System.Net;
using System.Net.Mail;
using Model;
using System.Collections.Generic;
﻿using System.Linq;
using DALContract;

namespace Business_Logic_Layer
{
    public class AdvertiseLogic
    {

        private static IAdvertiseDal _dataAccess;
        public AdvertiseLogic(IAdvertiseDal a)
        {
            _dataAccess = a;
        }

        public Advert GetAdvert(int id)
        {
            return _dataAccess.GetById(id);
        }

        public IEnumerable<Advert> GetAll()
        {  
            return _dataAccess.GetAll();
        }

        public IEnumerable<Advert> GetAllOpen()
        {
            return _dataAccess.GetAllOpen();
        }
        public IEnumerable<IGrouping<String,Advert>> GetAllByBrand()
        {
            return _dataAccess.GetAll().GroupBy(adv => adv.Brand);
        }
        

        public bool AddAdvert(Advert ad)
        {
            return _dataAccess.Add(ad);
        }

        public bool AddCommentary(Comment com)
        {
            return _dataAccess.AddComment(com);
        }

        public bool sendMail(MailMessage mail)
        {
            try
            {
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("AutoMobileMailService@gmail.com", "automobilepassword"),
                    EnableSsl = true
                };
                smtp.Send(mail);
                return true;
            }
            catch
            {
                return false;
            }
        }


        public IEnumerable<Advert> GetAllPaged(int page, int itemsperpage)
        {
            return _dataAccess.GetAllPaged(page, itemsperpage);
        }

        public IEnumerable<IGrouping<String, Advert>> GetAllByBrandPaged(int page, int AdvertsPerPage, int NDaysValidAfterExpired)
        {
            return _dataAccess.GetAll().GroupBy(adv => adv.Brand).Skip(page * AdvertsPerPage).Take(AdvertsPerPage);
        }


        public IEnumerable<IGrouping<String, Advert>> GetAllOpenByBrandPaged(int page, int AdvertsPerPage)
        {
            return _dataAccess.GetAllOpen().GroupBy(adv => adv.Brand).Skip(page * AdvertsPerPage).Take(AdvertsPerPage);
        }

        public bool DeleteAdvert(Advert advert)
        {
            return _dataAccess.Delete(advert);
        }
        public bool DeleteAdvertById(int advertId)
        {
            return _dataAccess.Delete(_dataAccess.GetById(advertId));
        }

        public bool UpdateAdvert(Advert advert)
        {
            return _dataAccess.Update(advert);
        }

        public int GetMaxYear()
        {
            return _dataAccess.GetMaxYear();
        }

        public int GetMinYear()
        {
            return _dataAccess.GetMinYear();
        }

        public float GetMaxPrice()
        {
            return _dataAccess.GetMaxPrice();
        }

        public float GetMinPrice()
        {
            return _dataAccess.GetMinPrice();
        }

        public float GetMaxKm()
        {
            return _dataAccess.GetMaxKm();
        }

        public float GetMinKm()
        {
            return _dataAccess.GetMinKm();
        }

        public static void SetDaysUntilTerminate(int nDaysValidAfterExpired)
        {
            _dataAccess.SetDaysUntilTerminate(nDaysValidAfterExpired);
        }
    }
}
