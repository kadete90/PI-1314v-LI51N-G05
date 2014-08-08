using System.ComponentModel.DataAnnotations;

namespace Model
{
    public class Comment
    {
        private static int _id;
        public int Id { get;  private set; }
        [Required(AllowEmptyStrings = false,ErrorMessage = "Message needed")]
        public int AdId { get; set; }
        public string Message { get; set; }
        public int Rating { get; set; }
        public string Username { get; set;}

        public Comment()
        {
            Id = _id++;
        }

        public Comment(int adId, string msg, int rate, string user)
        {
            Id = _id++;
            AdId = adId;
            Message = msg;
            Rating = rate;
            Username = user;
        }
    }
}
