using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{

    
    public class AccountController : BaseApiController
    {

        //private readonly ApplicationDataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService , IMapper mapper) {

            _mapper = mapper;
            _userManager = userManager;
            _tokenService = tokenService;
        
        }

        [HttpPost("register")] // post: api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) 
        {
            
            if (await UserExist(registerDto.Username)) return BadRequest("Username is taken");

            var user =  _mapper.Map<AppUser>(registerDto);
        


            user.UserName = registerDto.Username.ToLower();


            //user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            // user.PasswordSalt = hmac.Key;


            var result = await _userManager.CreateAsync(user, registerDto.Password);
             if (!result.Succeeded) {  return BadRequest(result.Errors); }

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");
            if (!roleResult.Succeeded) BadRequest(result.Errors);



            return new UserDto {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender= user.Gender,
            };
        }


        [HttpPost("login")] // post: api/account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) 
        {
            var user = await _userManager.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == loginDto.Username);
            if (user == null) return Unauthorized("invalid userName");

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!result) return Unauthorized("invalid password");


            return new UserDto
            {
                Username = user.UserName,
                Token = await  _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                 KnownAs= user.KnownAs,
                Gender = user.Gender 
            };

        }

         private async Task<bool> UserExist(string username) 
        {

            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

    }
}



//           using var hmac = new HMACSHA512(user.PasswordSalt);
//         var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

//for (int i = 0; i < computeHash.Length; i++)
//{
//    if (computeHash[i] != user.PasswordHash[i])
//    {
//        return Unauthorized("invalid Password");
//    }
//}
//return user; 

//Extra lernig
//Without async
//[HttpPost("register")] // post: api/accout/register
//public ActionResult<AppUser> Registers(string username, string password)
//{

//    using var hmac = new HMACSHA512();

//    var user = new AppUser
//    {

//        Name = username,
//        PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
//        PasswordSalt = hmac.Key


//    };

//    _context.Users.Add(user);
//     _context.SaveChanges();
//    return user;
//}