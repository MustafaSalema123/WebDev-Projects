﻿
using Bulky.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Bulky.DataAccess.Data
{
    public class ApplicationDBContext : IdentityDbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)  : base(options )
        {
        
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Company> Companies { get; set; }

        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<ApplicationUser> applicationUsers { get; set; }

        public DbSet<OrderHeader> OrderHeaders { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //froono erro in reposirtu Dpset
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, name = "Action", DisplayOrder=1}, 
                new Category { Id = 2, name = "Scifi", DisplayOrder = 2 }, 
                new Category { Id = 3, name = "history", DisplayOrder = 3 }

                );
            modelBuilder.Entity<Company>().HasData(
             new Company { Id = 1, Name = "Vivad Books",City = "Vid City " , PostalCode="66666",State="IL",PhoneNumber="78787878787"},
             new Company { Id = 2, Name = "Readers Club", City = "Readers City ", PostalCode = "55555", State = "IS", PhoneNumber = "423543535" },
            new Company { Id = 3, Name = "texh Solution Books", City = "Vid City ", PostalCode = "77890-", State = "Ind", PhoneNumber = "8968698698" }

             );



            modelBuilder.Entity<Product>().HasData(

                new Product {
                    Id = 1,
                    Title = "Fortune of Time",
                    Author = "Billy Spark",
                    Description = "Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ",
                    ISBN = "SWD9999001",
                    ListPrice = 99,
                    Price = 90,
                    Price50 = 85,
                    Price100 = 80,
                    CategoryId = 1,
                    ImageUrl = ""
                },
                   new Product
                   {
                       Id = 2,
                       Title = "Dark Skies",
                       Author = "Nancy Hoover",
                       Description = "Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ",
                       ISBN = "CAW777777701",
                       ListPrice = 40,
                       Price = 30,
                       Price50 = 25,
                       Price100 = 20,
                       CategoryId = 1,
                       ImageUrl = ""

                   }, new Product
                   {
                       Id = 3,
                       Title = "Vanish in the Sunset",
                       Author = "Julian Button",
                       Description = "Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ",
                       ISBN = "RITO5555501",
                       ListPrice = 55,
                       Price = 50,
                       Price50 = 40,
                       Price100 = 35,
                       CategoryId = 2,
                       ImageUrl = ""


                   },
                new Product
                {
                    Id = 4,
                    Title = "Cotton Candy",
                    Author = "Abby Muscles",
                    Description = "Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ",
                    ISBN = "WS3333333301",
                    ListPrice = 70,
                    Price = 65,
                    Price50 = 60,
                    Price100 = 55,
                    CategoryId = 2,
                    ImageUrl = ""


                },
                new Product
                {
                    Id = 5,
                    Title = "Rock in the Ocean",
                    Author = "Ron Parker",
                    Description = "Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ",
                    ISBN = "SOTJ1111111101",
                    ListPrice = 30,
                    Price = 27,
                    Price50 = 25,
                    Price100 = 20,
                    CategoryId = 2,
                    ImageUrl = ""


                },
                new Product
                {
                    Id = 6,
                    Title = "Leaves and Wonders",
                    Author = "Laura Phantom",
                    Description = "Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ",
                    ISBN = "FOT000000001",
                    ListPrice = 25,
                    Price = 23,
                    Price50 = 22,
                    Price100 = 20,
                    CategoryId = 3,
                    ImageUrl = ""


                }


                );
        }
    }
}