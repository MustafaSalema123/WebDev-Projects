using BlogApi.Models.DomainModel;
using BlogApi.Models.DTOs;
using BlogApi.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository _imageRepository;
        public ImagesController(IImageRepository imageRepository) 
        {
        _imageRepository= imageRepository;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            var images = await _imageRepository.GetAll();

            var response = new List<BlogImageDtos>();

            foreach (var image in images)
            {
                response.Add(new BlogImageDtos
                {
                    Id = image.Id,
                    DateCreated = image.DateCreated,
                    FileExtension = image.FileName,
                    FileName = image.FileName,
                    Title = image.Title,
                    Url = image.Url,
                });
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file , [FromForm] string fileName , [FromForm] string title)
        {
            ValidateFileUpload(file);

            if (ModelState.IsValid) 
            {
                //file Upload
                var blogImage = new BlogImage
                {
                FileExtension = Path.GetExtension(file.FileName).ToLower(),
                FileName= fileName,
                Title= title,
                DateCreated= DateTime.Now,
                };

                blogImage = await _imageRepository.UplaodImage(file, blogImage);

                //conbert Domain model Dto
                var response = new BlogImageDtos
                {
                    Id = blogImage.Id,
                    DateCreated = DateTime.Now,
                    FileExtension = file.FileName,
                    FileName = fileName,
                    Title = title
                };

                return Ok(response);
            }

            return BadRequest(ModelState);  
             
        }


        private void ValidateFileUpload(IFormFile file) 
        {

            var AllowExtension = new string[] { ".jpg", ".jpeg", ".png" };

            if(!AllowExtension.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupport File format ");
            }
            if(file.Length > 10485760) 
            {
                ModelState.AddModelError("file", "File size cannot be more than 10MB ");
            }
        }
    }
}
