namespace LeaveManagerAPI.Models
{
    public class LeaveRequest
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int EId { get; set; }
        public string FromDate { get; set; }
        public string ToDate {get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
        public int ManagerId { get; set; }        
        public string ApplyDateTime { get; set; }
        public string ReplyDateTime { get; set; }
    }
}