using BlogApi.Models.DomainModel;

namespace BlogApi.Repository.Interface
{
    public interface IImageRepository
    {

        Task<BlogImage> UplaodImage(IFormFile file , BlogImage blogImage);
        Task< IEnumerable<BlogImage>> GetAll();

    }
}
