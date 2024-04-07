namespace DB.Models; 
public class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
	// Del '?'
	public byte[]? DesignTheme { get; set; }
	// Del '?'
	public byte[]? Avatar { get; set; } 
    public IEnumerable<AspNetUser> Users { get; set; } = new List<AspNetUser>();
    public IEnumerable<Mission> Missions { get; set; } = new List<Mission>();
	public IEnumerable<UserProject> UserProjects { get; set; } = new List<UserProject>();
} 