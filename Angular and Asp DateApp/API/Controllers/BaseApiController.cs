
using API.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    // api/ controller name
    [Route("api/[controller]")]  // /api/all controller that we want to add
    public class BaseApiController : ControllerBase
    {
       
    }
}
