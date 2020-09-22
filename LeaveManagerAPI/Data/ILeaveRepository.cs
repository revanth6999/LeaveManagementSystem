using System.Collections.Generic;
using System.Threading.Tasks;
using LeaveManagerAPI.DTOs;
using LeaveManagerAPI.Models;

namespace LeaveManagerAPI.Data
{
    public interface ILeaveRepository
    {
        Task<IEnumerable<LeaveRequest>> GetLeaveRequests(int userId);
        Task<LeaveRequest> ApplyLeave(LeaveRequest leaveRequest);
        Task<bool> UpdateLeaveStatus(int leaveId, string status);
        Task<IEnumerable<LeaveRequest>> GetPendingRequests(int managerId);
        Task<IEnumerable<User>> GetPendingRequestsUsers(int managerId);
        Task<TotalLeave> AddLeavePolicy(TotalLeave totalLeave);
        Task<bool> UpdateUsedLeaves(int userId, UpdateLeaveDto updateLeaveDto);
        Task<TotalLeave> GetTotalLeaves();
        Task<bool> SaveAll();
    }
}