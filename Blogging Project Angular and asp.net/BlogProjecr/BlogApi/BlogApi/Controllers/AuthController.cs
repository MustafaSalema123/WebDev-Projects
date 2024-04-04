using BlogApi.Models.DomainModel;
using BlogApi.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenRepository _tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager , ITokenRepository tokenRepository) { 
            _userManager= userManager;
            _tokenRepository = tokenRepository;
        }

        [HttpPost]// api/auth/login
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request) 
        {
            var identityUser = await _userManager.FindByEmailAsync( request.Email);
            if(identityUser is not null) 
            {
                //Checl password
                var checkPasswordResult = await _userManager.CheckPasswordAsync(identityUser, request.Password);

                if (checkPasswordResult) {

                    var roles = await _userManager.GetRolesAsync(identityUser);
                    //Create a token and response
                    var jwtToken = _tokenRepository.CreatejwtToken(identityUser, roles.ToList());

                    var response = new LoginResponseDto()
                    {
                        Email = request.Email,
                        Roles = roles.ToList(),
                        Token = jwtToken
                    };
                    return Ok(response);
                }
            }
            ModelState.AddModelError(string.Empty, "Email or password is incorrect");

            return ValidationProblem(ModelState);
        }


        //post : : api/auth/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> register([FromBody] RegisterRequestDtos request) 
        {
            //Create IdentyUser object
            var users = new IdentityUser
            {
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim()
            };

            var identityResult = await _userManager.CreateAsync(users, request.Password) ;
            if(identityResult.Succeeded) 
            {
                //add role to User
                identityResult = await _userManager.AddToRoleAsync(users, "Reader");
                if (identityResult.Succeeded)
                {
                    return Ok();
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
            }

            return ValidationProblem(ModelState);
        }
    }
}
