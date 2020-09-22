using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using LeaveManagerAPI.Data;
using LeaveManagerAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LeaveManagerAPI.Controllers
{
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper Mapper;
        private readonly IUserRepository Repo;
        public UsersController(IMapper mapper, IUserRepository repo)
        {
            Mapper = mapper;
            Repo = repo;
        }

        [HttpGet]
        [Route("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await Repo.GetUsers();          
            return Ok(Mapper.Map<IEnumerable<UserDto>>(users));
        }

        [HttpGet]
        [Route("users/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await Repo.GetUser(id);
            return Ok(Mapper.Map<UserDto>(user));
        }

        [HttpGet]
        [Route("managers")]
        [AllowAnonymous]
        public async Task<IActionResult> GetManagers()
        {
            var managers = await Repo.GetManagers();
            return Ok(Mapper.Map<IEnumerable<ManagerDto>>(managers));   
        }
    }
}