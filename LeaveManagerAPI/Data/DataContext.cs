using LeaveManagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LeaveManagerAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<TotalLeave> TotalLeaves { get; set; }
        public DbSet<Test> Tests { get; set; }
    }
}