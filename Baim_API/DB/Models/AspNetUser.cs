using DB.Services.Classes;
using Microsoft.AspNetCore.Identity;
using Sieve.Attributes;
using System.Text.Json.Serialization;

namespace DB.Models;

public partial class AspNetUser : IdentityUser
{
	[Sieve(CanFilter = true, CanSort = true)]
	public string? Id1C { get; set; } = string.Empty;

	[Sieve(CanFilter = true, CanSort = true)]
	public string UserName { get; set; } 

	[Sieve(CanFilter = true, CanSort = true)]
	public string? LastName { get; set; }

	[Sieve(CanFilter = true, CanSort = true)]
	public string Role { get; set; } = "Client";


	[Sieve(CanFilter = true, CanSort = true)]
	public string Email { get; set; }


	public Enums.TaskState TaskState { get; set; } = Enums.TaskState.None;

	[JsonIgnore]
	public virtual ICollection<AspNetUserClaim> AspNetUserClaims { get; set; } = new List<AspNetUserClaim>();
	[JsonIgnore]
	public virtual ICollection<AspNetUserLogin> AspNetUserLogins { get; set; } = new List<AspNetUserLogin>();
	[JsonIgnore]
	public virtual ICollection<AspNetUserToken> AspNetUserTokens { get; set; } = new List<AspNetUserToken>();
	[JsonIgnore]
	public virtual ICollection<Order>? Orders { get; set; } = new List<Order>();

	public string? Patronimic { get; set; }
    public DateTime? BirthDate { get; set; }
    public string? Gender { get; set; }
	public int? Age { get; set; }
	public byte[]? Image { get; set; }



	[JsonIgnore]
	public Client? Client { get; set; }
	public int? ClientId { get; set; }

	[JsonIgnore]
	public Employer? Employer { get; set; }
	public int? EmployerId { get; set; }

	[JsonIgnore]
	public virtual ICollection<UserRole>? UserRoles { get; set; } = new List<UserRole>();
	[JsonIgnore]
	public IEnumerable<UserProject>? UserProjects { get; set; } = new List<UserProject>();
}