using BlogApi.Models.DomainModel;
using BlogApi.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace BlogApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryRepository _Categoryrepository;
        public CategoryController(ICategoryRepository Categoryrepository)
        {
            _Categoryrepository = Categoryrepository;
        }

        [HttpPost]

        public async Task<IActionResult> CreateCategory(CreateCategoryRequetsResponse request)
        {
            //map Dto domain _models
            var Category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle,
            };

            await _Categoryrepository.CreateAysnc(Category);

            var response = new CategoryDtos
            {
                Id = Category.Id,
                Name = Category.Name,
                UrlHandle = Category.UrlHandle,
            };


            return Ok(response);
        }

        [HttpGet]
     
        public async Task<IActionResult> GetAllCategory()
        {
            var categories = await _Categoryrepository.GetAllCategory();

            var response = new List<CategoryDtos>();
            foreach (var category in categories)
            {
                response.Add(new CategoryDtos
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle,
                });
            }
            return Ok(response);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var existingCategory = await _Categoryrepository.GetById(id);

            if (existingCategory == null) return NotFound();

            var response = new CategoryDtos
            {
                Id = existingCategory.Id,
                Name = existingCategory.Name,
                UrlHandle = existingCategory.UrlHandle,

            };
            return Ok(response);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        
        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, CreateCategoryRequetsResponse reqChange)
        {
            //convet DSTo to domain Model
            var Category = new Category
            {
                Id = id,
                Name = reqChange.Name,
                UrlHandle = reqChange.UrlHandle,
            };

            Category = await _Categoryrepository.UpdateSync(Category);

            if (Category == null) return NotFound();

            var response = new CategoryDtos
            {
                Id = Category.Id,
                Name = Category.Name,
                UrlHandle = Category.UrlHandle,
            };
            return Ok(response);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id) 
        {
            var delCategory = await _Categoryrepository.DeleteSync(id);

            if (delCategory == null) return NotFound();

            var response = new CategoryDtos
            {
                Id = delCategory.Id,
                Name = delCategory.Name,
                UrlHandle = delCategory.UrlHandle,

            };
            return Ok(response);

        }


    }
}
