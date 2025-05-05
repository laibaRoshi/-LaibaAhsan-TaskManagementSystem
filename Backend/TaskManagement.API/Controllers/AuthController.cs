using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagement.API.Models;
using TaskManagement.Core.Entities;

namespace TaskManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;
        
        public AuthController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IConfiguration configuration,
            ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _logger = logger;
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
            
            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            
            if (!result.Succeeded)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
            
            var token = await GenerateJwtTokenAsync(user);
            
            var roles = await _userManager.GetRolesAsync(user);
            
            return Ok(new LoginResponse
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email ?? "",
                    UserName = user.UserName ?? "",
                    Role = roles.FirstOrDefault() ?? "user"
                }
            });
        }
        
        private async Task<string> GenerateJwtTokenAsync(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            
            var roles = await _userManager.GetRolesAsync(user);
            
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["JWT:Secret"] ?? 
                throw new InvalidOperationException("JWT:Secret is not configured")));
                
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(1);
            
            var token = new JwtSecurityToken(
                _configuration["JWT:ValidIssuer"],
                _configuration["JWT:ValidAudience"],
                claims,
                expires: expires,
                signingCredentials: creds
            );
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
