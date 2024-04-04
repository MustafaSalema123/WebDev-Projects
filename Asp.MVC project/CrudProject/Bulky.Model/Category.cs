using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Bulky.Model
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [DisplayName("Name")]
        public string name { get; set; }
        [Range(1, 100)]
        [DisplayName("Display Order")]
        public int DisplayOrder { get; set; }
    }
}
