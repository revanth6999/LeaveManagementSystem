namespace LeaveManagerAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public float UsedCasualLeaves { get; set; }
        public float UsedEarnedLeaves { get; set; }
        public bool IsManager { get; set; }
        public int ManagerId { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}