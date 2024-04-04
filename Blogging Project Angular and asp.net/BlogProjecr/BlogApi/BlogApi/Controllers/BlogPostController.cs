using BlogApi.Models.DomainModel;

using BlogApi.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi.Controllers
{
    //we cann also use teh auto mapper to reduce the line
    [Route("api/[Controller]")]
    [ApiController]
    public class BlogPostController : ControllerBase
    {

        private readonly IBlogPostRepository _blogPostrepository;
        private readonly ICategoryRepository _categoryRepository;

        public BlogPostController(IBlogPostRepository blogPostrepository , ICategoryRepository categoryRepository)
        {
            _blogPostrepository = blogPostrepository;
            _categoryRepository = categoryRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAysc(CreateBlogPostRequetsResponse request)
        {
            var blogPost = new BlogPost
            {
                Author = request.Author,
                Content = request.Content,
                FeaturedImgUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                ShortDiscription
                = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                categories = new List<Category>()
            };

            foreach (var categoryGuid in request.Categories)
            {
                var existingCategory = await _categoryRepository.GetById(categoryGuid);
                if(existingCategory != null) 
                {
                blogPost.categories.Add(existingCategory);
                }
            }
            await _blogPostrepository.CreateAysnc(blogPost);
            //we cann also use teh auto mapper to reduce the line
            var response = new BlogPostDtos
            {
                Id = blogPost.Id,
                Author = blogPost.Author,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDiscription,
                FeaturedImageUrl = blogPost.FeaturedImgUrl,
                Content = blogPost.Content,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                UrlHandle = blogPost.UrlHandle,
                categories = blogPost.categories.Select(x => new CategoryDtos { 
                    Id = x.Id,
                Name= x.Name,
                UrlHandle= x.UrlHandle,}).ToList(),

            };

            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
            var blogPosts = await _blogPostrepository.GetAllPost();

            var response = new List<BlogPostDtos>();
            foreach (var blogPost in blogPosts)
            {
                response.Add(new BlogPostDtos
                {
                    Id = blogPost.Id,
                    Author = blogPost.Author,
                    Title = blogPost.Title,
                    ShortDescription = blogPost.ShortDiscription,
                    FeaturedImageUrl = blogPost.FeaturedImgUrl,
                    Content = blogPost.Content,
                    IsVisible = blogPost.IsVisible,
                    PublishedDate = blogPost.PublishedDate,
                    UrlHandle = blogPost.UrlHandle,
                    categories = blogPost.categories.Select(x => new CategoryDtos
                    {
                        Id = x.Id,
                        Name = x.Name,
                        UrlHandle = x.UrlHandle,
                    }).ToList(),
                });
            }


            return Ok(response);
        }

        //[HttpGet]
        //[Route("{id:Guid}")]
        [HttpGet("GetBlogPostById/{id}")]
      
        public async Task<IActionResult> GetBlogById([FromRoute] Guid id)
        {
            var blogPost = await _blogPostrepository.GetById(id);

            if (blogPost == null) { return NotFound(); } 

            //convert dominadata to DTO
            var response = new BlogPostDtos {
                Id = blogPost.Id,
                Author = blogPost.Author,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDiscription,
                FeaturedImageUrl = blogPost.FeaturedImgUrl,
                Content = blogPost.Content,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                UrlHandle = blogPost.UrlHandle,
                categories = blogPost.categories.Select(x => new CategoryDtos
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle,
                }).ToList(),
            };

            return Ok(response);
        }



        [HttpGet("GetBlogPostByUrlHandle/{urlHandle}")]
        public async Task<IActionResult> GetBlogPostByUrlHandle([FromRoute] string urlHandle) 
        {
            var blogPost = await _blogPostrepository.GetByUrlHandleAsync(urlHandle);

            if (blogPost is null)
                return NotFound();


            var response = new BlogPostDtos
            {
                Id = blogPost.Id,
                Author = blogPost.Author,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDiscription,
                FeaturedImageUrl = blogPost.FeaturedImgUrl,
                Content = blogPost.Content,
                IsVisible = blogPost.IsVisible,
                PublishedDate = blogPost.PublishedDate,
                UrlHandle = blogPost.UrlHandle,
                categories = blogPost.categories.Select(p => new CategoryDtos
                {
                    Id = p.Id,
                    Name = p.Name,
                    UrlHandle = p.UrlHandle
                }).ToList()
            };

            return Ok(response);

        }

        [HttpPut("{id}")]
   
        public async Task<IActionResult> UpdateblogPostbyId([FromRoute] Guid id , UpdateBlogPostRequestDto request) 
        {
            var blogPost = new BlogPost
            {
                Id = id,
                Author = request.Author,
                Title = request.Title,
                ShortDiscription = request.ShortDescription,
                FeaturedImgUrl = request.FeaturedImageUrl,
                Content = request.Content,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                UrlHandle = request.UrlHandle,
                categories = new List<Category>()
            };
            foreach (var categoryGuid in request.Categories)
            {
                var existingCategory = await _categoryRepository.GetById(categoryGuid);

                if (existingCategory != null)
                {
                    blogPost.categories.Add(existingCategory);
                }
            }
            var updatedBlogPost = await _blogPostrepository.UpdateSync(blogPost);

            if (updatedBlogPost == null)
                return NotFound();

            var response = new BlogPostDtos
            {
                Id = blogPost.Id,
                Author = request.Author,
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                FeaturedImageUrl = request.FeaturedImageUrl,
                Content = request.Content,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                UrlHandle = request.UrlHandle,
                categories = blogPost.categories.Select(p => new CategoryDtos
                {
                    Id = p.Id,
                    Name = p.Name,
                    UrlHandle = p.UrlHandle
                }).ToList()
            };

            return Ok(response);

        }

        [HttpDelete]
        [Route("{id:Guid}")]
       
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id) 
        {
            var delblogpost = await _blogPostrepository.DeleteSync(id);
            if(delblogpost == null) return NotFound();

            var response = new BlogPostDtos { Id = delblogpost.Id 
            , Author = delblogpost.Author,
                Title = delblogpost.Title,
                ShortDescription = delblogpost.ShortDiscription,
                FeaturedImageUrl = delblogpost.FeaturedImgUrl,
                Content = delblogpost.Content,
                IsVisible = delblogpost.IsVisible,
                PublishedDate = delblogpost.PublishedDate,
                UrlHandle = delblogpost.UrlHandle,
                //categories = delblogpost.categories.Select(p => new CategoryDtos
                //{
                //    Id = p.Id,
                //    Name = p.Name,
                //    UrlHandle = p.UrlHandle
                //}).ToList()
            };

            return Ok(response);    

        }
    }
}
