using System.Collections.Generic;
using System.Threading.Tasks;
using LeaveManagerAPI.Models;
using LeaveManagerAPI.DTOs;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace LeaveManagerAPI.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext Context;
        private readonly IMapper Mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            Context = context;
            Mapper = mapper;
        }
        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await Context.Users.ToListAsync();
            return users;
        }
        public async Task<IEnumerable<User>> GetManagers()
        {
            var managers = await Context.Users.Where(m => m.IsManager == true).ToListAsync();
            return managers;
        }
        public async Task<User> GetUser(int id)
        {
            var user = await Context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }
        // public async Task<bool> SaveAll()
        // {
        //     return await Context.SaveChangesAsync() > 0;
        // }
    }
}