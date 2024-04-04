using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.DataAccess.Data;


namespace Bulky.DataAccess.Repository
{
    public class ApplicationUserRepository : Repository<ApplicationUser>, IApplicationUserRepository
    {
        private ApplicationDBContext _db;
        public ApplicationUserRepository(ApplicationDBContext db) : base(db)
        {
            _db = db;
        }
       
        public void Update(ApplicationUser obj)
        {

            _db.applicationUsers.Update(obj);
        }

       
    }
}
