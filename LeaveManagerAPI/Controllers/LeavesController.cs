using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using LeaveManagerAPI.Data;
using LeaveManagerAPI.DTOs;
using LeaveManagerAPI.Models;
using LeaveManagerAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace LeaveManagerAPI.Controllers
{
    [Authorize]
    [ApiController]
    public class LeavesController : ControllerBase
    {
        private readonly IMapper Mapper;
        private readonly IUserRepository UserRepo;
        private readonly ILeaveRepository LeaveRepo;
        private readonly IHostEnvironment Environment;
        private readonly ILogger Logger;
        private readonly IConfiguration Configuration;
        public LeavesController(IMapper mapper, IUserRepository userRepo, ILeaveRepository leaveRepo, IHostEnvironment environment, ILogger logger, IConfiguration configuration)
        {
            Mapper = mapper;
            UserRepo = userRepo;
            LeaveRepo = leaveRepo;
            Environment = environment;
            Logger = logger;
            Configuration = configuration;
        }

        [HttpGet]
        [Route("leaves/{userId}")]
        public async Task<IActionResult> GetLeaves(int userId)
        {
            var leaveRequests = await LeaveRepo.GetLeaveRequests(userId);
            return Ok(leaveRequests);
        }

        [HttpPost]
        [Route("request")]
        public async Task<IActionResult> ApplyLeave(LeaveRequest leaveRequest)
        {
            DateTimeHandler dateTimeHandler = new DateTimeHandler();
            var totalLeave = await LeaveRepo.GetTotalLeaves();
            var user = await UserRepo.GetUser(leaveRequest.EId);          
                   
            try
            {
                float noOfLeaveDays = dateTimeHandler.CalculateDays(leaveRequest.FromDate, leaveRequest.ToDate);
                if(noOfLeaveDays <= 0)
                    return BadRequest("Please check From and To dates");

                if(leaveRequest.Type.Equals("Earned") && (totalLeave.TotalEarnedLeaves - user.UsedEarnedLeaves) >= noOfLeaveDays ||
                    leaveRequest.Type.Equals("Casual") && (totalLeave.TotalCasualLeaves - user.UsedCasualLeaves) >= noOfLeaveDays)
                { 
                    var leave = await LeaveRepo.ApplyLeave(leaveRequest);    
                    String logFilePath = Environment.ContentRootPath + Configuration.GetValue<String>("LogFile");
                    Logger.log("  NLR\t:" + 
                        " E-ID: " + leaveRequest.EId +
                        ", Type: " + leaveRequest.Type +
                        ", From: " + leaveRequest.FromDate +
                        ", To: " + leaveRequest.ToDate, logFilePath);

                    return Created(
                        leave.Id.ToString(),
                        leave
                    );
                }
                else
                    return BadRequest(
                        "Your available leaves of the selected type are exhausted"
                    );
            }
            catch(FormatException)
            {
                return StatusCode(500, "Could not send leave request. Please try again later!");
            }
            
            
        }

        [HttpPut]
        [Route("updateStatus")]
        public async Task<IActionResult> UpdateLeaveStatus(LeaveRequest leaveRequest)
        {
            var updateLeaveDto = new UpdateLeaveDto();
            
            await LeaveRepo.UpdateLeaveStatus(leaveRequest.Id, leaveRequest.Status);
            String logFilePath = Environment.ContentRootPath + Configuration.GetValue<String>("LogFile");    
            
            if(leaveRequest.Status.Equals("Approved"))
            {
                DateTimeHandler dateTimeHandler = new DateTimeHandler();
                float usedCasualLeaves = 0, usedEarnedLeaves = 0;

                if(leaveRequest.Type.Equals("Casual"))
                    usedCasualLeaves = dateTimeHandler.CalculateDays(leaveRequest.FromDate, leaveRequest.ToDate);
                else if(leaveRequest.Type.Equals("Earned"))
                    usedEarnedLeaves = dateTimeHandler.CalculateDays(leaveRequest.FromDate, leaveRequest.ToDate);

                updateLeaveDto = new UpdateLeaveDto{
                    UsedCasualLeaves = usedCasualLeaves,
                    UsedEarnedLeaves = usedEarnedLeaves
                };
                await LeaveRepo.UpdateUsedLeaves(leaveRequest.EId, updateLeaveDto);                
            }
            else
            {
                updateLeaveDto = new UpdateLeaveDto{
                    UsedCasualLeaves = 0,
                    UsedEarnedLeaves = 0
                };
            } 

            Logger.log("  LRSU\t:" + 
                " ID: " + leaveRequest.Id +
                ", E-ID: " + leaveRequest.EId +
                ", M-ID: " + leaveRequest.ManagerId +
                ", Type: " + leaveRequest.Type +
                ", From: " + leaveRequest.FromDate +
                ", To: " + leaveRequest.ToDate +
                ", Status: " + leaveRequest.Status, logFilePath);

            return Ok(
                new {
                    leaveRequest.EId,
                    updateLeaveDto
                }
            );    
        }

        [HttpPost]
        [Route("addLeavePolicy")]
        public async Task<IActionResult> AddLeavePolicy(TotalLeave totalLeave)
        {
            totalLeave.UpdateDateTime = DateTime.Now.ToShortDateString();
            var createdTotalLeave = await LeaveRepo.AddLeavePolicy(totalLeave);
        
            return Created(
                createdTotalLeave.Id.ToString(),
                createdTotalLeave
            );
        }

        [HttpGet]
        [Route("pendingRequests/{mId}")]
        public async Task<IActionResult> GetPendingRequests(int mId)
        {
            var pendingRequests = await LeaveRepo.GetPendingRequests(mId);
            return Ok(
                pendingRequests
            );
        }
        
        [HttpGet]
        [Route("totalLeaves")]
        public async Task<IActionResult> GetTotalLeaves()
        {
            var totalLeave = await LeaveRepo.GetTotalLeaves();
            return Ok(totalLeave);
        }
    }
}