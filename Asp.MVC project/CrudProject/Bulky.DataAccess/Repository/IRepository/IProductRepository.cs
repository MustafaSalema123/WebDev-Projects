using Bulky.Model;


namespace Bulky.DataAccess.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        void Update(Product obj);
      //  void Save();
    }
}
