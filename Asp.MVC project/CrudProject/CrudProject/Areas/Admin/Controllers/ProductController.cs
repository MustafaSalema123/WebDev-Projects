using Bulky.DataAccess.Data;
using Bulky.DataAccess.Repository;
using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.Model.ViewModels;
using Bulky.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

using System.Data;

namespace CrudProject.Areas.Admin.Controllers
{
    [Area("Admin")] 
    //ye autoize isliey daale hai ka koi url se naa chale chaiye admin panel mai (accessDenidi callho)
    [Authorize(Roles = staticDetails.Role_Admin)]
    public class ProductController : Controller
    {
        private readonly IUnitofWork _unitofWork;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductController(IUnitofWork db, IWebHostEnvironment webHostEnvironment)
        {
            _unitofWork = db;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            List<Product> objProductList = _unitofWork.Product.GetAll(includeProperties:"Category").ToList();
            
            return View(objProductList);
        }

        //updaet and Insert
        public IActionResult UpSert(int? id)
        {
            //IEnumerable<SelectListItem> CategoryList = _unitofWork.Category.GetAll().Select
            //    (u => new SelectListItem
            //    {
            //        Text = u.name,
            //        Value = u.Id.ToString(),

            //    });
            //key what value we gave (use in creat.htmlo in select option)= 
            //ViewBag.CategoryList = categoryList;
            // ViewBag["CategoryList"] = CategoryList;

            ProductVM productVM = new() {

                categaryList = _unitofWork.Category.GetAll().Select
                (u => new SelectListItem
                {
                    Text = u.name,
                    Value = u.Id.ToString(),

                }),
                product = new Product()

        };

            if (id == 0 || id == null) 
            {
                //Create
            return View(productVM);
            }
            else 
            {
                //Update
            productVM.product = _unitofWork.Product.Get(u => u.Id == id);
                return View(productVM);
            }
            
        }

        [HttpPost]
        public IActionResult UpSert(ProductVM productVM , IFormFile? file)
        {
            //if (obj.name == obj.DisplayOrder.ToString())

            //{
            //    ModelState.AddModelError("name", "The displayordrr connat exarlty math the same");

            //}
            if (ModelState.IsValid) // [ [Range(1,100)] datm anoatation
            {
                string wwwRootPath = _webHostEnvironment.WebRootPath;
                Console.WriteLine(" path testing " + wwwRootPath);
                if (file != null)
                {
                   
                  
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    //Location where we wnat to save
                    string productPath = Path.Combine(wwwRootPath, @"images\product");

                    if (!string.IsNullOrEmpty(productVM.product.ImageUrl)) 
                    {
                    var oldImgPath = Path.Combine(wwwRootPath , productVM.product.ImageUrl).TrimStart('\\');
                        if (System.IO.File.Exists(oldImgPath))
                          {
                            System.IO.File.Delete(oldImgPath);
                        }
                    }


                    using (var fileStream = new FileStream(Path.Combine(productPath, fileName), FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }

                    productVM.product.ImageUrl = @"\images\product\" + fileName;
                }

                if (productVM.product.Id == 0) 
                {

                _unitofWork.Product.Add(productVM.product);
                }
                else 
                {
                    _unitofWork.Product.Update(productVM.product);
                }

                _unitofWork.Save();
                TempData["success"] = "Product created successfully";
                return RedirectToAction("Index");

            }
            else 
            {


           productVM.categaryList = _unitofWork.Category.GetAll().Select
           (u => new SelectListItem
           {
               Text = u.name,
               Value = u.Id.ToString(),

           });

            return View(productVM);
            }

        }

        public IActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }
            Product productfromDb = _unitofWork.Product.Get(u => u.Id == id);
            if (productfromDb == null)
            {
                return NotFound();
            }
            return View(productfromDb);
        }

        [HttpPost]
        public IActionResult Edit(Product obj)
        {
            if (ModelState.IsValid) // [ [Range(1,100)] datm anoatation
            {
                _unitofWork.Product.Update(obj);
                _unitofWork.Save();
                TempData["success"] = "Product updated successfully";
                return RedirectToAction("Index");

            }

            return View();
        }

        //public IActionResult delete(int? id)
        //{
        //    if (id == null || id == 0)
        //    {
        //        return NotFound();
        //    }
        //    Product? productfromDb = _unitofWork.Product.Get(u => u.Id == id);
        //    if (productfromDb == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(productfromDb);

        //}

        //[HttpPost, ActionName("delete")]
        //public IActionResult DeletePost(int? id)
        //{
        //    Product? obj = _unitofWork.Product.Get(u => u.Id == id);
        //    if (obj == null)
        //    {
        //        return NotFound();
        //    }
        //    _unitofWork.Product.Remove(obj);
        //    _unitofWork.Save();
        //    return RedirectToAction("Index");
        //}

        #region
        //egt Data in json form in url use
        [HttpGet]
        public IActionResult GetAll(int id) 
        {
            List<Product> objProductList = _unitofWork.Product.GetAll(includeProperties: "Category").ToList();

            return Json(new { data = objProductList });
        }

        [HttpDelete]
        public IActionResult Delete(int? id)
        {
            var productToBeDeleted = _unitofWork.Product.Get(u => u.Id == id);
            if (productToBeDeleted == null)
            {
                return Json(new { success = false, message = "Error while deleting" });
            }

            var oldImagePath =
                           Path.Combine(_webHostEnvironment.WebRootPath,
                           productToBeDeleted.ImageUrl.TrimStart('\\'));

            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
            }

            _unitofWork.Product.Remove(productToBeDeleted);
            _unitofWork.Save();

            return Json(new { success = true, message = "Delete Successful" });
        }

        #endregion

    }
}
