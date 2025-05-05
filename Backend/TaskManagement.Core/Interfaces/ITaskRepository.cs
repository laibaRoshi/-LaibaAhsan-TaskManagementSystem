using TaskManagement.Core.Entities;
using TaskManagement.Core.Models;

namespace TaskManagement.Core.Interfaces
{
    public interface ITaskRepository : IRepository<AppTask>
    {
        Task<IEnumerable<AppTask>> GetTasksByUserIdAsync(string userId);
        Task<TaskStatistics> GetTaskStatisticsAsync(string userId);
    }
}

