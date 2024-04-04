using BlogApi.Data;
using BlogApi.Models.DomainModel;
using BlogApi.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Repository.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDataContext _dataContext;
        public CategoryRepository(ApplicationDataContext dataContext) 
        {
        _dataContext= dataContext;
        }
        public async Task<Category> CreateAysnc(Category category)
        {
            await _dataContext.Categories.AddAsync(category);
           await _dataContext.SaveChangesAsync();

            return category;
        }

        public async Task<Category> DeleteSync(Guid id)
        {
           var existdata = await _dataContext.Categories.FirstOrDefaultAsync(x => x.Id == id); 
            //if(existdata is null) return null;
            if(existdata != null) 
            {
               _dataContext.Categories.Remove(existdata);   
                await _dataContext.SaveChangesAsync();  
            return existdata;
            }

            return null;
        }

        public async Task<IEnumerable<Category>> GetAllCategory()
        {
            return await _dataContext.Categories.ToListAsync();
        }

        public async Task<Category> GetById(Guid id)
        {
            return await _dataContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Category> UpdateSync(Category category)
        {
            var existingCatgory = await _dataContext.Categories.FirstOrDefaultAsync(x => x.Id ==category.Id);
            if (existingCatgory != null)
            {
                _dataContext.Entry(existingCatgory).CurrentValues.SetValues(category);
                await _dataContext.SaveChangesAsync();
                return category;
            }
            return null;
        }
    }
}
