using BlogApi.Data;
using BlogApi.Models.DomainModel;
using BlogApi.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Repository.Implementation
{
    public class ImageRepository : IImageRepository
    {
            
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public readonly ApplicationDataContext _context;
        public ImageRepository(IWebHostEnvironment webHostEnvironment , IHttpContextAccessor httpContextAccessor , ApplicationDataContext context) 
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<BlogImage> UplaodImage(IFormFile file, BlogImage blogImage)
        {
            //1. upload the image to Api/images
            //uper wal projext tkka root nad filder/  folder name { Images }
            var localPath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", $"{blogImage.FileName}{blogImage.FileExtension}");
            using var stream = new FileStream(localPath, FileMode.Create);
            await file.CopyToAsync(stream);


            //2.Update the Database
            var httpRequest = _httpContextAccessor.HttpContext.Request;
            var urlPath = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/Images/{blogImage.FileName}{blogImage.FileExtension}";
            
            blogImage.Url = urlPath;

            await _context.BlogImages.AddAsync(blogImage);
            await _context.SaveChangesAsync();
            return blogImage;

        }

        public async Task<IEnumerable<BlogImage>> GetAll()
        {
        return await _context.BlogImages.ToListAsync();
        }
    }
}
