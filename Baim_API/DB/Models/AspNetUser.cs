using DB.Services.Classes;
using Microsoft.AspNetCore.Identity;
namespace DB.Models;

public partial class AspNetUser : IdentityUser
{
	public string Id1C { get; set; } = string.Empty;

	// Del ?
	public int? Age { get; set; }
	public byte[]? Image { get; set; }

	public string Description { get; set; } = string.Empty;
	public Enums.TaskState TaskState { get; set; } = Enums.TaskState.None;
		
	public virtual ICollection<AspNetUserClaim> AspNetUserClaims { get; set; } = new List<AspNetUserClaim>();
	public virtual ICollection<AspNetUserLogin> AspNetUserLogins { get; set; } = new List<AspNetUserLogin>();
	public virtual ICollection<AspNetUserToken> AspNetUserTokens { get; set; } = new List<AspNetUserToken>();
	public string Role { get; set; } = "User";

	public virtual ICollection<Order>? Orders { get; set; } = new List<Order>();  
	 
	// Del ?
	public Client? Client { get; set; }
	public int? ClientId { get; set; }

	// Del ?
	public Employer? Employer { get; set; }
	public int? EmployerId { get; set; }

	// Del ?
	public virtual ICollection<UserRole>? UserRoles { get; set; } = new List<UserRole>();

	public IEnumerable<UserProject> UserProjects { get; set; } = new List<UserProject>();
}