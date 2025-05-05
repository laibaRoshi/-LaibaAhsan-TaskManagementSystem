using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.Core.Entities;
using TaskManagement.Core.Interfaces;
using TaskManagement.Core.Models; 

namespace TaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;
        private readonly ILogger<TasksController> _logger;
        
        public TasksController(ITaskRepository taskRepository, ILogger<TasksController> logger)
        {
            _taskRepository = taskRepository;
            _logger = logger;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppTask>>> GetTasks()
        {
            try
            {
                // Get user ID from claims
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }
                
                var tasks = await _taskRepository.GetTasksByUserIdAsync(userId);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tasks");
                return StatusCode(500, "An error occurred while retrieving tasks");
            }
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<AppTask>> GetTask(int id)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            
            if (task == null)
            {
                return NotFound();
            }
            
            return Ok(task);
        }
        
        [HttpPost]
        public async Task<ActionResult<AppTask>> CreateTask(AppTask task)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            
            task.CreatedById = int.Parse(userId);
            task.CreatedAt = DateTime.UtcNow;
            
            await _taskRepository.AddAsync(task);
            
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, AppTask task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }
            
            try
            {
                await _taskRepository.UpdateAsync(task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating task");
                return StatusCode(500, "An error occurred while updating the task");
            }
            
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            
            if (task == null)
            {
                return NotFound();
            }
            
            await _taskRepository.DeleteAsync(task);
            
            return NoContent();
        }
        
        [HttpGet("stats")]
        public async Task<ActionResult<TaskStatistics>> GetTaskStatistics()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            
            var stats = await _taskRepository.GetTaskStatisticsAsync(userId);
            return Ok(stats);
        }
    }
}
