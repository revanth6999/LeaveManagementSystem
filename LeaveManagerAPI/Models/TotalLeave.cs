namespace LeaveManagerAPI.Models
{
    public class TotalLeave
    {
        public int Id { get; set; }
        public string UpdateDateTime { get; set; }
        public float TotalCasualLeaves { get; set; }
        public float TotalEarnedLeaves { get; set; }
    }
}