using BlogApi.Data;
using BlogApi.Models.DomainModel;
using BlogApi.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Repository.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDataContext _dataContext;
        public BlogPostRepository(ApplicationDataContext dataContext) 
        {
        _dataContext= dataContext;
        }
        public async Task<BlogPost> CreateAysnc(BlogPost blogPost)
        {
            await _dataContext.BlogPosts.AddAsync(blogPost);
           await _dataContext.SaveChangesAsync();

            return blogPost;
        }

        public async Task<BlogPost> DeleteSync(Guid id)
        {
           var existdata = await _dataContext.BlogPosts.FirstOrDefaultAsync(x => x.Id == id); 
            //if(existdata is null) return null;
            if(existdata != null) 
            {
               _dataContext.BlogPosts.Remove(existdata);   
                await _dataContext.SaveChangesAsync();  
            return existdata;
            }

            return null;
        }

        public async Task<IEnumerable<BlogPost>> GetAllPost()
        {
           // return await _dataContext.BlogPosts.ToListAsync();
            return await _dataContext.BlogPosts.Include(x => x.categories).ToListAsync();
        }

        public async Task<BlogPost?> GetById(Guid id)
        {
            //return await _dataContext.BlogPosts.FirstOrDefaultAsync(x => x.Id == id);
            return await _dataContext.BlogPosts.Include(x=> x.categories).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<BlogPost> GetByUrlHandleAsync(string urlhandle)
        {
            //.include is a a navigation properties that i take in category class
            return await _dataContext.BlogPosts.Include(x => x.categories).FirstOrDefaultAsync(p => p.UrlHandle == urlhandle);
        }

        public async Task<BlogPost> UpdateSync(BlogPost blogPost)
        {
            //var existingCatgory = await _dataContext.BlogPosts.FirstOrDefaultAsync(x => x.Id == blogPost.Id);
            var existingBlogPost = await _dataContext.BlogPosts.Include(p => p.categories).FirstOrDefaultAsync(p => p.Id == blogPost.Id);
            if (existingBlogPost != null)
            {
                _dataContext.Entry(existingBlogPost).CurrentValues.SetValues(blogPost);
                existingBlogPost.categories = blogPost.categories;
                await _dataContext.SaveChangesAsync();
                return blogPost;
            }
            return null;
        }
    }
}
