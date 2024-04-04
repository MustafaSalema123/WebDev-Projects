using BlogApi.Data;
using BlogApi.Models.DomainModel;
using BlogApi.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BlogApi.Repository.Implementation
{
    public class TokenRepository : ITokenRepository
    {

        private readonly IConfiguration _configuration;

        public TokenRepository(IConfiguration configuration) { _configuration= configuration; }


        public string CreatejwtToken(IdentityUser user, List<string> roles)
        {
            //Create a climas
            var Claims = new List<Claim>();
            {
                new Claim(ClaimTypes.Email, user.Email);
            }
            Claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var Credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(

                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: Claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: Credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);


        }
    }
}
