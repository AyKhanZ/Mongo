using System.Text.Json.Serialization;

namespace DB.Models;
public class Client
{
	public int Id { get; set; }

	public string UserId { get; set; } = string.Empty;
    public AspNetUser User { get; set; } = new AspNetUser();

	public string? BusinessPhoneNumber { get; set; }
	public string? PersonalEmail { get; set; }  
	public bool IsDirector { get; set; } = false;

	public int? CompanyId { get; set; }
	public Company? Company { get; set; }


	public bool IsPublic { get; set; } = false; 
	public byte[]? ClientFeedback { get; set; } 
	public byte[]? ClientConfirm { get; set; }
	public string? YoutubeLink { get; set; } = string.Empty;
}