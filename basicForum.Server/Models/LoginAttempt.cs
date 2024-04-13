using System.ComponentModel.DataAnnotations;

namespace basicForum.Server.Models
{
    public class LoginAttempt
    {
        [Key]
        public string? username { get; set; }
        public string? password { get; set; }
    }
}
