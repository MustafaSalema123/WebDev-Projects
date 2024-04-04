using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interface
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAysnc();

        Task<IEnumerable<AppUser>> GetUsersAysnc();
        Task <AppUser> GetUsersByIdAysnc(int id);

        Task<AppUser> GetUserByUserNameAysnc(string name);

        //Task<IEnumerable<memberDto>> GetMembersAysnc();

        Task<PagedList<memberDto>> GetMembersAysnc(UserParams userParams);
        Task<memberDto> GetMemberAysnc(string name);
        Task<String> GetUserGender(string username);
    }
}
