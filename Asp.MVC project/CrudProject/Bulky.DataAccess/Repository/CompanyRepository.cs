using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.DataAccess.Data;


namespace Bulky.DataAccess.Repository
{
    public class CompanyRepository : Repository<Company>, ICompanyRepository
    {
        private ApplicationDBContext _db;
        public CompanyRepository(ApplicationDBContext db) : base(db)
        {
            _db = db;
        }
       
        public void Update(Company obj)
        {

            _db.Companies.Update(obj);
        }

       
    }
}
