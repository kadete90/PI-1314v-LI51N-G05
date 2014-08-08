﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
﻿using System.Linq;
﻿using Model.CustomAtribute;

namespace Model
{
    public class Advert
    {
        private static int _id;

        public int Id { get; private set; }

        public string Title { get; set; }
        [Required(ErrorMessage = "Marca obrigatória")]
        public string Brand { get; set; }
        [Required(ErrorMessage = "Modelo obrigatório")]
        public string Model { get; set; }
        public string Version { get; set; }
        [Required(ErrorMessage = "Ano obrigatório")]
        [RangeYearToCurrentYear(1900, ErrorMessage = "Name can not be 3 characters or less")]
        public int Year { get; set; }
        [Required(ErrorMessage = "Km's obrigatórios")]
        public float Kilometers { get; set; }
        [Required(ErrorMessage = "Tipo de combustível obrigatório")]
        public FuelTypeEnum FuelType { get; set; }
        public GeoLocalization Local { get; set; }
        [Required(ErrorMessage = "Obrigatório tem dono")]
        public string AdvertiseOwner { get; set; } //username of user that created advert
        [Required(ErrorMessage = "Preço obrigatório")]
        public float Price { get; set; }
        public string Description { get; set; }
        public bool Negotiable { get; set; }
        public DateTime ValidUntil { get; set; }
        public AdvertStatusEnum Status = AdvertStatusEnum.Ativo;
        private readonly LinkedList<Photo> _photos = new LinkedList<Photo>();
        public LinkedList<Photo> Photos { get { return _photos; } }
        private readonly LinkedList<Comment> _comments;
        public LinkedList<Comment> Comments { get { return _comments; } }
        public Characteristics Characteristics { get; set; }
        public float averageRate;

        public Advert()
        {
            _comments = new LinkedList<Comment>();
        }

        public Advert(string title, string brand, string model, string version, int year, float km, FuelTypeEnum fu, GeoLocalization l, string owner, float price
            , bool nego, DateTime valDateTime, Characteristics c, String description = "N/A")
            : this()
        {
            Id = _id++;
            Title = title;
            Brand = brand;
            Model = model;
            Version = version;
            Year = year;
            Kilometers = km;
            FuelType = fu;
            Description = description;
            Local = l;
            AdvertiseOwner = owner;
            Price = price;
            Negotiable = nego;
            ValidUntil = valDateTime;
            Characteristics = c;
        }

        public Boolean AddPhoto(Photo photo)
        {
            if (photo == null) return false;
            _photos.AddLast(photo);
            return true;
        }

        public bool AddComment(Comment comment)
        {
            if (comment == null) return false;
            _comments.AddLast(comment);
            float newAvg = _comments.Aggregate<Comment, float>(0, (current, c) => current + c.Rating);
            averageRate = newAvg / _comments.Count;
            return true;
        }
    }
}