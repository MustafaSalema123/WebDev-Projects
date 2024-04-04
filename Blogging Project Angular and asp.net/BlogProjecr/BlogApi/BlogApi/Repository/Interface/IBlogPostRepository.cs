using BlogApi.Models.DomainModel;

namespace BlogApi.Repository.Interface
{
    public interface IBlogPostRepository
    {

        Task<BlogPost> CreateAysnc(BlogPost category);
        Task<IEnumerable<BlogPost>> GetAllPost();

        Task<BlogPost?> GetById(Guid id);

        Task<BlogPost> GetByUrlHandleAsync(string urlhandle);

        Task<BlogPost> UpdateSync(BlogPost category);
        Task<BlogPost> DeleteSync(Guid id);

    }
}
