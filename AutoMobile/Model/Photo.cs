using System;

namespace Model
{
    public class Photo
    {
        public string Link { get; private set; }
        public string Name { get; private set; }
        public Photo(string l)
        {
            Link = l;
            Name = l.Substring(0,l.IndexOf('.'));
        }
        public void setPhotoName(String name)
        {
            Name = name;
        }
    }
}
