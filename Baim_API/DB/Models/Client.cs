namespace DB.Models;
public class Client
{
	public int Id { get; set; }

	public string UserId { get; set; } = string.Empty;
    public AspNetUser User { get; set; } = new AspNetUser();

	public bool IsPublic { get; set; } = true; // Для приватности 
	public byte[]? ClientFeedback { get; set; } // image
	public byte[]? ClientConfirm { get; set; } // image
	public string YoutubeLink { get; set; } = string.Empty; 
}