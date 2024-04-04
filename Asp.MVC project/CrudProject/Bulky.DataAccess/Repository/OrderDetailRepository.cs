using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.DataAccess.Data;


namespace Bulky.DataAccess.Repository
{
    public class OrderDetailRepository : Repository<OrderDetail>, IOrderDetailRepository
	{
        private ApplicationDBContext _db;
        public OrderDetailRepository(ApplicationDBContext db) : base(db)
        {
            _db = db;
        }
       
        public void Update(OrderDetail obj)
        {

            _db.OrderDetail.Update(obj);
        }

       
    }
}
