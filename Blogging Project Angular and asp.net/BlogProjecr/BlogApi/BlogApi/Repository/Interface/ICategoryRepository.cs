using BlogApi.Models.DomainModel;

namespace BlogApi.Repository.Interface
{
    public interface ICategoryRepository
    {

        Task<Category> CreateAysnc(Category category);
        Task<IEnumerable<Category>> GetAllCategory();

        Task<Category> GetById(Guid id);
        Task<Category> UpdateSync(Category category);
        Task<Category> DeleteSync(Guid id);

    }
}
