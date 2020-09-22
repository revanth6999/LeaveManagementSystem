using System.Collections.Generic;
using System.Threading.Tasks;
using LeaveManagerAPI.Models;
using LeaveManagerAPI.DTOs;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System;
using LeaveManagerAPI.Services;

namespace LeaveManagerAPI.Data
{
    public class LeaveRepository : ILeaveRepository
    {
        private readonly DataContext Context;
        private readonly IMapper Mapper;
        public LeaveRepository(DataContext context, IMapper mapper)
        {
            Context = context;
            Mapper = mapper;
        }
        public async Task<IEnumerable<LeaveRequest>> GetLeaveRequests(int userId)
        {
            var leaveRequests = await Context.LeaveRequests.Where(l => l.EId == userId).ToListAsync();
            return leaveRequests;
        }        
        public async Task<LeaveRequest> ApplyLeave(LeaveRequest leaveRequest)
        {
            leaveRequest.Status = "Pending";
            leaveRequest.ApplyDateTime =  DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToLongTimeString();
            try
            {
                await Context.LeaveRequests.AddAsync(leaveRequest);
                await SaveAll();
                return leaveRequest;
            }
            catch(Exception)
            {
                return null;
            }
        }
        public async Task<bool> UpdateLeaveStatus(int leaveId, string status)
        {
            try
            {
                var leaveRequest = await Context.LeaveRequests.Where(l => l.Id == leaveId).FirstOrDefaultAsync();
                leaveRequest.ReplyDateTime = DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToLongTimeString();
                leaveRequest.Status = status;
                await SaveAll();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }
        public async Task<IEnumerable<LeaveRequest>> GetPendingRequests(int managerId)
        {
            var pendingRequests = await Context.LeaveRequests.Where(l => l.Status.Equals("pending") && l.ManagerId == managerId).ToListAsync();
            return pendingRequests;
        }

        public async Task<IEnumerable<User>> GetPendingRequestsUsers(int managerId)
        {
            var pendingRequests = await Context.LeaveRequests.Where(l => l.Status.Equals("pending") && l.ManagerId == managerId).ToListAsync();
            List<User> pendingRequestsUsers = new List<User>();
            for(int i = 0; i < pendingRequests.Count; i++)
            {
                pendingRequestsUsers.Add(await Context.Users.FirstOrDefaultAsync(u => u.Id == pendingRequests[i].EId));
            }
            return pendingRequestsUsers;
        }

        public async Task<TotalLeave> AddLeavePolicy(TotalLeave totalLeave)
        {
            try
            {
                await Context.TotalLeaves.AddAsync(totalLeave);
                await SaveAll();
                return totalLeave;
            }
            catch(Exception)
            {
                return null;
            }
        }
        public async Task<bool> UpdateUsedLeaves(int userId, UpdateLeaveDto updateLeaveDto)
        {
            try
            {
                var user = await Context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                user.UsedCasualLeaves += updateLeaveDto.UsedCasualLeaves;
                user.UsedEarnedLeaves += updateLeaveDto.UsedEarnedLeaves;
                await SaveAll();
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }
        public async Task<TotalLeave> GetTotalLeaves()
        {
            int id = await Context.TotalLeaves.MaxAsync(t => t.Id);
            TotalLeave totalLeave = await Context.TotalLeaves.FirstOrDefaultAsync(t => t.Id == id);
            return totalLeave;
        }
        public async Task<bool> SaveAll()
        {
            return await Context.SaveChangesAsync() > 0;
        }
    }
}