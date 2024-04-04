using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {

        private readonly ApplicationDataContext _context;
        public LikesRepository(ApplicationDataContext context) {

            _context = context;

        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int targetUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId , targetUserId);
        }

        public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes  =_context.Likes.AsQueryable();

            if(likesParams.predicate == "liked") 
            {
                likes = likes.Where(like => like.SourcesUserId == (likesParams.userId));
                users = likes.Select(like => like.TargetUser);
            }
            if (likesParams.predicate == "likedby")
            {
                likes = likes.Where(like => like.TargetUserId == (likesParams.userId));
                users = likes.Select(like => like.SourcesUser);
            }

            var likedUsers = users.Select(users => new LikeDto
            {
                UserName = users.UserName,
                KnownAs = users.KnownAs,
                Age = users.DateOfBirth.CalculateAge(),
                PhotoUrl = users.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = users.City,
                Id = users.Id,

            });

            return await PagedList<LikeDto>.CreateAsync(likedUsers,
                likesParams.PageNumber, likesParams.PageSize);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users.Include(x => x.LikedUsers).FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}
