using BlogApi.Models.DomainModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Data
{
    public class AuthdbContext : IdentityDbContext
    {
        public AuthdbContext(DbContextOptions<AuthdbContext> options) : base(options) 
        {

        }

        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    base.OnModelCreating(builder);

        //    //create Reader and writer Role
        //    var readerRoleId = "88949c6f-2547-4568-b881-f86cff4e0d15";
        //    var writerRoleId = "7f095995-641e-44de-bd04-26a9547f0665";

        //    var roles = new List<IdentityRole>
        //    {
        //        new IdentityRole()
        //        {
        //            Id= readerRoleId,
        //            Name = "Reader",
        //            NormalizedName = "Reader".ToLower(),
        //            ConcurrencyStamp = readerRoleId
        //        },
        //        new IdentityRole()
        //        {
        //            Id= writerRoleId,
        //            Name = "Writer",
        //            NormalizedName = "Writer".ToLower(),
        //            ConcurrencyStamp = writerRoleId

        //        }
        //     };


        //    //seed the role
        //    builder.Entity<IdentityRole>().HasData(roles);

        //    //Create and Admin User
        //    var adminUserId = "436cd8da-149e-4d2d-817d-bc6f24e23489";
        //    var admin = new IdentityUser()
        //    {
        //        Id = adminUserId,
        //        UserName = "Admin@blog.com",
        //        Email = "Admin@blog.com",
        //        NormalizedEmail = "Admin@blog.com".ToLower(),
        //        NormalizedUserName = "Admin@blog.com".ToLower()
        //    };
        //    admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "admin@123");

        //    builder.Entity<IdentityUser>().HasData(admin);

        //    var adminRoles = new List<IdentityUserRole<string>>()
        //    {
        //        new()
        //        {
        //            UserId = adminUserId,
        //            RoleId = readerRoleId
        //        },
        //        new()
        //        {
        //            UserId = adminUserId,
        //            RoleId = writerRoleId
        //        }
        //    };

        //    builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        //}

    }


    }

