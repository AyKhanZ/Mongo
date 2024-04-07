namespace DB.Models;
public class UserProject
{ 
	public int Id { get; set; }

	public string UserId { get; set; } = string.Empty;
	public AspNetUser User { get; set; } = new AspNetUser();

	public int ProjectId { get; set; }
	public Project Project { get; set; } = new Project();
}
