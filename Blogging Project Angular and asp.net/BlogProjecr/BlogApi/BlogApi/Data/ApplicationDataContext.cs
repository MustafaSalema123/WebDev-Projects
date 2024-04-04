using BlogApi.Models.DomainModel;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Data
{
    public class ApplicationDataContext : DbContext
    {
        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<BlogImage> BlogImages { get; set; }
    }
}
