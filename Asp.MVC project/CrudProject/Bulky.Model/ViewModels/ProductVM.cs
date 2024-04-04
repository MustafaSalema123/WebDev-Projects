
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.Rendering;
namespace Bulky.Model.ViewModels
{
    public class ProductVM
    {
        public Product product { get; set; }

        [ValidateNever]
        public IEnumerable<SelectListItem> categaryList { get;set; }
    }
}
