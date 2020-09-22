using System.Linq;
using AutoMapper;
using LeaveManagerAPI.DTOs;
using LeaveManagerAPI.Models;

namespace LeaveManagerAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<User, ManagerDto>();
        }
    }
}