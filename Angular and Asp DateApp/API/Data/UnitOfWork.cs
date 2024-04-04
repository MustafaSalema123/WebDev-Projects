﻿

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
    public class UnitOfWork : IUnitOfWork
    {
        public readonly ApplicationDataContext _context;
        public readonly IMapper _mapper;
        public UnitOfWork(ApplicationDataContext context , IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public ILikesRepository LikesRepository => new LikesRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}
