using System.ComponentModel.DataAnnotations;

namespace basicForum.Server.Models
{
    public class User
    {
        [Key]
        public string? username { get; set; }
        public Byte[]? password { get; set; }
    }
}
