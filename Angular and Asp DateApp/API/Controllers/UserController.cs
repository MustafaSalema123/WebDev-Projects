using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    [Authorize]
    public class UserController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UserController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService) {
            _mapper = mapper;
            _photoService = photoService;
            _userRepository = userRepository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<memberDto>>> GetUsers([FromQuery] UserParams userParams)
        {

            var gender = await _userRepository.GetUserGender(User.GetUsername());
            userParams.CurrentUsername = User.GetUsername();


            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = gender == "male" ? "female" : "male";
            }

            //var users = await _userRepository.GetUsersAysnc();
            // var users = await _userRepository.GetMembersAysnc();

            var users = await _userRepository.GetMembersAysnc(userParams);

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize
                , users.TotalCount, users.TotalPages));

            //var usersToReturn = _mapper.Map<IEnumerable<memberDto>>(users);

            return Ok(users);

        }


        [Authorize(Roles = "Member")]
        [HttpGet("{username}")]
        public async Task<ActionResult<memberDto>> GetUser(string username)
        {

            return  Ok(await _userRepository.GetMemberAysnc(username));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(memberUpdateDto memberUpdateDto) 
        {
            //var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

         
          //  var  user = await _userRepository.GetUserByUserNameAysnc(username);

            var  user = await _userRepository.GetUserByUserNameAysnc(User.GetUsername());

            if(user == null) return NotFound();

            _mapper.Map(memberUpdateDto, user);

            if(await _userRepository.SaveAllAysnc()) return NoContent();

            return BadRequest("Failed to updaet User data");

        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file) 
        {
            var user = await _userRepository.GetUserByUserNameAysnc(User.GetUsername());

            if(user == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,

            };
            if (user.Photos.Count == 0) photo.IsMain = true;
            user.Photos.Add(photo);

            //if (await _userRepository.SaveAllAysnc()) return _mapper.Map<PhotoDto>(photo);
            if (await _userRepository.SaveAllAysnc()) {
                return CreatedAtAction(nameof(GetUser), new { username = user.UserName },
                    _mapper.Map<PhotoDto>(photo));
                    
                    }

            return BadRequest("Problem adding photo");

        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUserNameAysnc(User.GetUsername());

            if (user == null) return NotFound();

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("this is already your main photo");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            if (currentMain != null) currentMain.IsMain = false;
            photo.IsMain = true;

            if (await _userRepository.SaveAllAysnc()) return NoContent();

            return BadRequest("Problem setting the main photo");
        }


        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUserNameAysnc(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);

            if (await _userRepository.SaveAllAysnc()) return Ok();

            return BadRequest("Problem deleting photo");
        }

    }
}



//without memeber user
//[HttpGet]
//public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
//{
//    var users = _userRepository.GetUsersAysnc();

//    var usersToReturn = _mapper.Map<IEnumerable<memberDto>>(users);

//    return Ok(usersToReturn);

//}

//[HttpGet("{id}")]
//public async Task<ActionResult<memberDto>> GetUser(int id)
//{

//   // var users = _userRepository.GetMembersAysnc();

//    return Ok(await _userRepository.GetUsersByIdAysnc( id));
//}