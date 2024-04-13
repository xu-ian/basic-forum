using Microsoft.EntityFrameworkCore;

namespace basicForum.Server.Models
{
    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options)
        : base(options)
        {
        }

        public DbSet<Message> Messages { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        public DbSet<Forum> Forums { get; set; } = null!;
    }
}
