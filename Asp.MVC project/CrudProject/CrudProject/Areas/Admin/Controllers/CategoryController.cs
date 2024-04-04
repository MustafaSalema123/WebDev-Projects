using Bulky.DataAccess.Data;
using Bulky.DataAccess.Repository.IRepository;
using Bulky.Model;
using Bulky.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Immutable;

namespace CrudProject.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles =staticDetails.Role_Admin)]
    public class CategoryController : Controller
    {
        private readonly IUnitofWork _unitofWork;
        public CategoryController(IUnitofWork db)
        {
            _unitofWork = db;
        }

        public IActionResult Index()
        {
            List<Category> objCategoryList = _unitofWork.Category.GetAll().ToList();
            return View(objCategoryList);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Category obj)
        {
            if (obj.name == obj.DisplayOrder.ToString())

            {
                ModelState.AddModelError("name", "The displayordrr connat exarlty math the same");

            }
            if (ModelState.IsValid) // [ [Range(1,100)] datm anoatation
            {
                _unitofWork.Category.Add(obj);
                _unitofWork.Save();
                TempData["success"] = "Category created successfully";
                return RedirectToAction("Index");

            }

            return View();
        }

        public IActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }
            Category categoryfromDb = _unitofWork.Category.Get(u => u.Id == id);
            if (categoryfromDb == null)
            {
                return NotFound();
            }
            return View(categoryfromDb);
        }

        [HttpPost]
        public IActionResult Edit(Category obj)
        {
            if (ModelState.IsValid) // [ [Range(1,100)] datm anoatation
            {
                _unitofWork.Category.Update(obj);
                _unitofWork.Save();
                TempData["success"] = "Category updated successfully";
                return RedirectToAction("Index");

            }

            return View();
        }

        public IActionResult delete(int? id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }
            Category? categoryfromDb = _unitofWork.Category.Get(u => u.Id == id);
            if (categoryfromDb == null)
            {
                return NotFound();
            }
            return View(categoryfromDb);

        }

        [HttpPost, ActionName("delete")]
        public IActionResult DeletePost(int? id)
        {
            Category? obj = _unitofWork.Category.Get(u => u.Id == id);
            if (obj == null)
            {
                return NotFound();
            }
            _unitofWork.Category.Remove(obj);
            _unitofWork.Save();
            return RedirectToAction("Index");
        }

    }
}
