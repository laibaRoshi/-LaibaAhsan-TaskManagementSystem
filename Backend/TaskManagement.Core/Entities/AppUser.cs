using Microsoft.AspNetCore.Identity;

namespace TaskManagement.Core.Entities
{
    public class AppUser : IdentityUser
    {
        public string? Name { get; set; }
        public string? AvatarUrl { get; set; }
        
        // Navigation properties
        public virtual ICollection<AppTask> AssignedTasks { get; set; } = new List<AppTask>();
        public virtual ICollection<AppTask> CreatedTasks { get; set; } = new List<AppTask>();
    }
}
