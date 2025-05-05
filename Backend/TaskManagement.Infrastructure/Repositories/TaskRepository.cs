using Microsoft.EntityFrameworkCore;
using TaskManagement.Core.Entities;
using TaskManagement.Core.Interfaces;
using TaskManagement.Core.Models;
using TaskManagement.Infrastructure.Data;

namespace TaskManagement.Infrastructure.Repositories
{
    public class TaskRepository : Repository<AppTask>, ITaskRepository
    {
        public TaskRepository(ApplicationDbContext context) : base(context)
        {
        }
        
        public async Task<IEnumerable<AppTask>> GetTasksByUserIdAsync(string userId)
        {
            return await _context.AppTasks
                .Where(t => t.AssignedToId.ToString() == userId)
                .Include(t => t.AssignedTo)
                .Include(t => t.CreatedBy)
                .ToListAsync();
        }
        
        public async Task<TaskStatistics> GetTaskStatisticsAsync(string userId)
        {
            var tasks = await _context.AppTasks
                .Where(t => t.AssignedToId.ToString() == userId)
                .ToListAsync();
                
            return new TaskStatistics
            {
                Total = tasks.Count,
                Pending = tasks.Count(t => t.Status == "pending"),
                InProgress = tasks.Count(t => t.Status == "in-progress"),
                Completed = tasks.Count(t => t.Status == "completed")
            };
        }
    }
}
