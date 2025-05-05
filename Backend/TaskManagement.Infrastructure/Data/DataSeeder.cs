using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TaskManagement.Core.Entities;

namespace TaskManagement.Infrastructure.Data
{
    public static class DataSeeder
    {
        public static async Task SeedDataAsync(IServiceProvider serviceProvider)
        {
            var dbContext = serviceProvider.GetRequiredService<ApplicationDbContext>();
            var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            
            // Apply migrations
            await dbContext.Database.MigrateAsync();
            
            // Seed roles
            string[] roleNames = { "Admin", "User" };
            
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
            
            // Seed admin user
            var adminEmail = "admin@example.com";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            
            if (adminUser == null)
            {
                adminUser = new AppUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true,
                    Name = "Admin User",
                    AvatarUrl = ""
                };
                
                var result = await userManager.CreateAsync(adminUser, "Admin123!");
                
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
            
            // Seed regular user
            var userEmail = "user@example.com";
            var regularUser = await userManager.FindByEmailAsync(userEmail);
            
            if (regularUser == null)
            {
                regularUser = new AppUser
                {
                    UserName = userEmail,
                    Email = userEmail,
                    EmailConfirmed = true,
                    Name = "John Doe",
                    AvatarUrl = ""
                };
                
                var result = await userManager.CreateAsync(regularUser, "User123!");
                
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(regularUser, "User");
                }
            }
            
            // Add data seeding call to Program.cs:
            // if (app.Environment.IsDevelopment())
            // {
            //     using (var scope = app.Services.CreateScope())
            //     {
            //         var services = scope.ServiceProvider;
            //         await DataSeeder.SeedDataAsync(services);
            //     }
            // }
        }
    }
}
