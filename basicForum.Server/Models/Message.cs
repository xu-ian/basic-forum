using System.ComponentModel.DataAnnotations.Schema;

namespace basicForum.Server.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string? username { get; set; }
        public string? message { get; set; }
        public string? forumName { get; set; }
        public int upvotes {  get; set; }
        public int downvotes { get; set; }
    }
}
