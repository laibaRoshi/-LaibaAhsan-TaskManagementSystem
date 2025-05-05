namespace TaskManagement.Core.Models
{
    public class TaskStatistics
    {
        public int Total { get; set; }
        public int Pending { get; set; }
        public int InProgress { get; set; }
        public int Completed { get; set; }
    }
}
