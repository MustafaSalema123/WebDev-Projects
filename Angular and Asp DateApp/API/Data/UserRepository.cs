

using API.DTOs;
using API.Entities;
using API.Interface;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Xml.Linq;
using API.Helpers;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        public readonly ApplicationDataContext _context;
        public readonly IMapper _mapper;
        public UserRepository(ApplicationDataContext context , IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<memberDto> GetMemberAysnc(string name)
        {
            // return await _context.Users.Where(x => x.Name == name)
            //.Select(user => new memberDto
            //{
            //    Id = user.Id,
            //    Name= user.Name,
            //    KnownAs= user.KnownAs,
            //})
            //.SingleOrDefaultAsync();
            return await _context.Users.
                Where(x => x.UserName == name)
                .ProjectTo<memberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

        }

        //Called in nusercontroll to get all sycn
        //public async Task<IEnumerable<memberDto>> GetMembersAysnc()
        //{
        //    return await _context.Users
        //       .ProjectTo<memberDto>(_mapper.ConfigurationProvider)
        //       .ToListAsync();
        //}

        public async Task<PagedList<memberDto>> GetMembersAysnc(UserParams userParams) 
        {
       // var Query = _context.Users.ProjectTo<memberDto>(_mapper.ConfigurationProvider).AsNoTracking();
        var Query = _context.Users.AsQueryable();

            Query = Query.Where(u => u.UserName != userParams.CurrentUsername);
            Query = Query.Where(u => u.Gender == userParams.Gender);

            var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.maxAge - 1));
            var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge ));

            Query = Query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            Query = userParams.OrderBy switch
            {
                "created" => Query.OrderByDescending(u => u.Created),
                _ => Query.OrderByDescending(u => u.LastActive),
            };

            return await PagedList<memberDto>.CreateAsync(
                Query.AsNoTracking().ProjectTo<memberDto>(_mapper.ConfigurationProvider)
                , userParams.PageNumber , userParams.PageSize);
        }
        public async Task<AppUser> GetUserByUserNameAysnc(string useruame)
        {
            return await _context.Users.
                Include(p => p.Photos).
                SingleOrDefaultAsync(x => x.UserName == useruame);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users.Where(x => x.UserName == username).Select(x => x.Gender).FirstOrDefaultAsync();
        }


        public async Task<IEnumerable<AppUser>> GetUsersAysnc()
        {
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        public async Task<AppUser> GetUsersByIdAysnc(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> SaveAllAysnc()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
