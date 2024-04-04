using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.DataAccess.Data;


namespace Bulky.DataAccess.Repository
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private ApplicationDBContext _db;
        public CategoryRepository(ApplicationDBContext db) : base(db)
        {
            _db = db;
        }
       
        public void Update(Category obj)
        {

            _db.Categories.Update(obj);
        }

       
    }
}
