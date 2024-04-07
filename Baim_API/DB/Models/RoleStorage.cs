using Microsoft.AspNetCore.Identity; 

namespace DB.Models;
public static class RoleStorage
{
	public static List<IdentityRole> Roles { get; private set; }

	static RoleStorage()
	{
		Roles = new List<IdentityRole>()
		{
			new IdentityRole("Admin"), 
			new IdentityRole("User"),
			new IdentityRole("Employer")
		};
	}
}