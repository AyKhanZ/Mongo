namespace Baim_API.Models.Client;
public class ClientModel
{
	//Personal
	public string Patronimic { get; set; }
	public string Email { get; set; } 
	public string? PersonalEmail { get; set; } 
	public string? PhoneNumber { get; set; } 
	public string? BusinessPhoneNumber { get; set; }
	public byte[]? Image { get; set; }
	public DateTime? BirthDate { get; set; }
	public string? Gender { get; set; }
	public int? Age { get; set; }
	// Company
	public string CompanyName { get; set; }
	public string VOEN { get; set; }
	public string? TypeOfActivity { get; set; }
	public DateTime? StartDate { get; set; }
	public string? Address { get; set; }
}
