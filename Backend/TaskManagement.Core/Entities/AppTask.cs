namespace TaskManagement.Core.Entities
{
    public class AppTask
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; } 
        public required string Status { get; set; }
        public required string Priority { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public required string Category { get; set; }
        
        public int AssignedToId { get; set; }
        public int CreatedById { get; set; }
        
        // Navigation properties
        public virtual required AppUser AssignedTo { get; set; }
        public virtual required AppUser CreatedBy { get; set; }
    }
}
