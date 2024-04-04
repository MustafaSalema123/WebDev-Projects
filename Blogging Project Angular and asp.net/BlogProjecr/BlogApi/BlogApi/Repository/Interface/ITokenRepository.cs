using BlogApi.Models.DomainModel;
using Microsoft.AspNetCore.Identity;

namespace BlogApi.Repository.Interface
{
    public interface ITokenRepository
    {
        public string CreatejwtToken(IdentityUser user , List<string> roles);
       
      

    }
}
