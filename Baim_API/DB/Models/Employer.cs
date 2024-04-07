namespace DB.Models;
public class Employer
{
	public int Id { get; set; }

	public string UserId { get; set; } = string.Empty;
	public AspNetUser User { get; set; } = new AspNetUser();

	public string Position { get; set; } = string.Empty;
	public int Experience { get; set; }
	public string Certificates { get; set; } = string.Empty;
}