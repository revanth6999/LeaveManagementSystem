using System.Collections.Generic;
using System.Threading.Tasks;
using LeaveManagerAPI.DTOs;
using LeaveManagerAPI.Models;

namespace LeaveManagerAPI.Data
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<IEnumerable<User>> GetManagers();        
    }
}