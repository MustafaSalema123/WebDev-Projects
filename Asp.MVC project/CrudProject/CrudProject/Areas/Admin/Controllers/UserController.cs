using Bulky.DataAccess.Data;
using Bulky.DataAccess.Repository;
using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.Model.ViewModels;
using Bulky.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

using System.Data;

namespace CrudProject.Areas.Admin.Controllers
{
    [Area("Admin")] 
    //ye autoize isliey daale hai ka koi url se naa chale chaiye admin panel mai (accessDenidi callho)
    [Authorize(Roles = staticDetails.Role_Admin)]
    public class UserController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUnitofWork _unitofWork;
     
        public UserController(IUnitofWork db , UserManager<IdentityUser> userManager)
        {
            _unitofWork = db;
            _userManager = userManager;
       
        }

        public IActionResult Index()
        {
           
            
            return View();
        }


   
        #region
        //egt Data in json form in url use
        [HttpGet]
        public IActionResult GetAll() 
        {
            List<ApplicationUser> objUserList = _unitofWork.ApplicationUser.GetAll(includeProperties: "Company").ToList();
            foreach (var user in objUserList)
            {

                user.Role = _userManager.GetRolesAsync(user).GetAwaiter().GetResult().FirstOrDefault();

                if (user.Company == null)
                {
                    user.Company = new Company()
                    {
                        Name = ""
                    };
                }
            }
            return Json(new { data = objUserList });
        }

    
        #endregion

    }
}
