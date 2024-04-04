
using API.Extensions;
using API.Interface;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using API.DTOs;
using API.Helpers;

using Microsoft.AspNetCore.Authorization;
using System.Security.Principal;
using System.Security.Claims;

namespace API.Controllers
{



    public class LikesController : BaseApiController
    {
     
        private readonly IUserRepository _userRepository;
        private readonly ILikesRepository _likesRepository;


       
        public LikesController(IUserRepository userRepository, ILikesRepository likesRepository)
        {
            _userRepository = userRepository;
            _likesRepository = likesRepository;
   

        }
        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username) 
        {

            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByUserNameAysnc(username);
            var sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot Like YourSelf");

            var userLike = await _likesRepository.GetUserLike(sourceUserId , likedUser.Id);

            if (userLike != null) return BadRequest("You already like this user");

            userLike = new UserLike
            {
                SourcesUserId = sourceUserId,
                TargetUserId = likedUser.Id,
            };

            sourceUser.LikedUsers.Add(userLike);

            if(await _userRepository.SaveAllAysnc()) return Ok();

            return BadRequest("Failed to like user");
        }

        //[Authorize]
        //[HttpGet()]
        //public IActionResult test()
        //{
        //    // string userName = "asdadf"/* _tokenService.GetUserName()*/;

        //    var userNameId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    var userName = HttpContext.User.Identity.Name;
        //    //var userName = HttpContext.User.Identity.Name;
        //    var userNames = User.GetUsername();
        //    // Now you can use the username as needed
        //    return Ok(userName);
        //}


        //[AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<PagedList<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams)
        {


            likesParams.userId = User.GetUserId();
            //likesParams.userId = likedUse;
            var users = await _likesRepository.GetUserLikes(likesParams);

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize
                , users.TotalCount, users.TotalPages));

            return Ok(users);
        }
    }
}
//var userPasss = User.FindFirst(JwtRegisteredClaimNames.UniqueName)?.Value;
//var userPass = HttpContext.User.FindFirstValue("userName");
//var userPassss = HttpContext.User.FindFirstValue("UserName");
//var userName = User.GetUsername();
//Console.WriteLine(userPass);