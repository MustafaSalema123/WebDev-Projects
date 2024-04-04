using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.DataAccess.Data;


namespace Bulky.DataAccess.Repository
{
    public class OrderHeaderRepository : Repository<OrderHeader>, IOrderHeaderRepository
	{
        private ApplicationDBContext _db;
        public OrderHeaderRepository(ApplicationDBContext db) : base(db)
        {
            _db = db;
        }
       
        public void Update(OrderHeader obj)
        {

            _db.OrderHeaders.Update(obj);
        }

        public void UpdateStatus(int id, string orderStatus, string? paymentStatus = null)
        {
           var OrderfromDb = _db.OrderHeaders.FirstOrDefault(x => x.Id == id);
            if(OrderfromDb != null) 
            {
            OrderfromDb.OrderStatus= orderStatus;
                if(!string.IsNullOrEmpty(paymentStatus)) 
                {
                OrderfromDb.PaymentStatus= paymentStatus;
                }
            }
        }

        public void UpdateStripePaymentID(int id, string sessionId, string paymentIntentId)
        {
            var OrderfromDb = _db.OrderHeaders.FirstOrDefault(x => x.Id == id);
            if (!string.IsNullOrEmpty(sessionId)) 
            {
            OrderfromDb.SessionId= sessionId;
            }
            if (!string.IsNullOrEmpty(paymentIntentId))
            {
                OrderfromDb.SessionId = paymentIntentId;
                OrderfromDb.PaymentDate= DateTime.Now;
            }
        }
    }
}
