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
    public class CompanyController : Controller
    {
        private readonly IUnitofWork _unitofWork;
     
        public CompanyController(IUnitofWork db)
        {
            _unitofWork = db;
       
        }

        public IActionResult Index()
        {
            List<Company> objCompanyList = _unitofWork.Company.GetAll().ToList();
            
            return View(objCompanyList);
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

      
            if (id == 0 || id == null) 
            {
                //Create
            return View(new Company());
            }
            else 
            {
                //Update
                Company company = _unitofWork.Company.Get(u => u.Id == id);
                return View(company);
            }
            
        }

        [HttpPost]
        public IActionResult UpSert(Company companyObj)
        {
            //if (obj.name == obj.DisplayOrder.ToString())

            //{
            //    ModelState.AddModelError("name", "The displayordrr connat exarlty math the same");

            //}
            if (ModelState.IsValid) // [ [Range(1,100)] datm anoatation
            {
           
              

                if (companyObj.Id == 0) 
                {

                _unitofWork.Company.Add(companyObj);
                }
                else 
                {
                    _unitofWork.Company.Update(companyObj);
                }

                _unitofWork.Save();
                TempData["success"] = "Company created successfully";
                return RedirectToAction("Index");

            }
            else 
            {


         
            return View(companyObj);
            }

        }


     

        //public IActionResult delete(int? id)
        //{
        //    if (id == null || id == 0)
        //    {
        //        return NotFound();
        //    }
        //    Company? productfromDb = _unitofWork.Company.Get(u => u.Id == id);
        //    if (productfromDb == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(productfromDb);

        //}

        //[HttpPost, ActionName("delete")]
        //public IActionResult DeletePost(int? id)
        //{
        //    Company? obj = _unitofWork.Company.Get(u => u.Id == id);
        //    if (obj == null)
        //    {
        //        return NotFound();
        //    }
        //    _unitofWork.Company.Remove(obj);
        //    _unitofWork.Save();
        //    return RedirectToAction("Index");
        //}

        #region
        //egt Data in json form in url use
        [HttpGet]
        public IActionResult GetAll(int id) 
        {
            List<Company> objCompanyList = _unitofWork.Company.GetAll().ToList();

            return Json(new { data = objCompanyList });
        }

        [HttpDelete]
        public IActionResult Delete(int? id)
        {
            var CompnayToBeDeleted = _unitofWork.Company.Get(u => u.Id == id);
            if (CompnayToBeDeleted == null)
            {
                return Json(new { success = false, message = "Error while deleting" });
            }

            

            _unitofWork.Company.Remove(CompnayToBeDeleted);
            _unitofWork.Save();

            return Json(new { success = true, message = "Delete Successful" });
        }

        #endregion

    }
}
