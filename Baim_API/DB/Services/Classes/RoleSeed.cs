using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DB.Services.Classes;
public static class RoleSeed
{
	public static void SeedRoles(ModelBuilder builder)
	{
		builder.Entity<IdentityRole>().HasData(
			new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin" },
			new IdentityRole() { Name = "Client", ConcurrencyStamp = "2", NormalizedName = "Client" },
			new IdentityRole() { Name = "Employer", ConcurrencyStamp = "3", NormalizedName = "Employer" }
		);
	}
}