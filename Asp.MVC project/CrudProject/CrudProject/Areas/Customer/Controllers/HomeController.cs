using Bulky.DataAccess.Repository;
using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Security.Claims;

namespace CrudProject.Areas.Customer.Controllers
{
    [Area("Customer")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IUnitofWork _unitofWork;
        public HomeController(ILogger<HomeController> logger , IUnitofWork unitofWork)
        {
            _logger = logger;
            _unitofWork = unitofWork;
        }

        public IActionResult Index()
        {
            IEnumerable<Product> productsList = _unitofWork.Product.GetAll(includeProperties: "Category").ToList();

            return View(productsList);
        }
        public IActionResult Details(int? productId)
        {

            ShoppingCart shoppingCart = new()
            {
                Product = _unitofWork.Product.Get(u => u.Id == productId, includeProperties: "Category"),
                Count = 1

            };
           // Product product = _unitofWork.Product.Get(u => u.Id == productId, includeProperties: "Category");

            return View(shoppingCart);
        }

        // add a coun tof cart in data base 
        [HttpPost]
        [Authorize]
        public IActionResult Details(ShoppingCart shoppingCart)
        {
            //fro if not login than check the user identy
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

            shoppingCart.ApplicationUserId = userId;

            //for not duplicate the same product id (if i again add in cart)
            
            ShoppingCart cartfromDb = _unitofWork.ShoppingCart.Get(u=>u.ApplicationUserId== userId && u.ProductId == shoppingCart.ProductId);
            if(cartfromDb != null) 
            {
                //Shopping cart Exit
                cartfromDb.Count += shoppingCart.Count;
                _unitofWork.ShoppingCart.Update(cartfromDb);
               // _unitofWork.ShoppingCart.Update(shoppingCart);
            }
            else
            {
                // add new cat record
            _unitofWork.ShoppingCart.Add(shoppingCart);

            }




            _unitofWork.Save();
            // Product product = _unitofWork.Product.Get(u => u.Id == productId, includeProperties: "Category");
            
            ///we want to view in shoping if not than have a excaptopn erori in details of Model.product
            //return View();
            return RedirectToAction(nameof(Index));
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}