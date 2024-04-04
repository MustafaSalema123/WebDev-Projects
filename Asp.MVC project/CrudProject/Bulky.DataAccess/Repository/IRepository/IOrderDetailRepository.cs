using Bulky.Model;


namespace Bulky.DataAccess.Repository.IRepository
{
    public interface IOrderDetailRepository : IRepository<OrderDetail>
    {
        void Update(OrderDetail obj);
      //  void Save();
    }
}
