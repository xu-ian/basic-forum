using System.ComponentModel.DataAnnotations;

namespace basicForum.Server.Models
{
    public class Forum
    {
        [Key]
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
