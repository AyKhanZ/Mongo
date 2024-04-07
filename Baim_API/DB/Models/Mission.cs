namespace DB.Models;
public class Mission
{
	public int Id { get; set; } 
	public string Title { get; set; } = string.Empty;
	public bool IsVeryImportant { get; set; } = false;
	public string Description { get; set; } = string.Empty;
	public bool IsExpired { get; set; } = false; // Просрочена

	public DateTime StartDate { get; set; } = DateTime.Now;

	public DateTime DeadLine { get; set; } = DateTime.Now.AddMonths(1);

	// Del ?
	public int ProjectId { get; set; }
	public Project Project { get; set; } = new Project();

	// Del ?
	public virtual ICollection<UserRole>? UserRoles { get; set; } = new List<UserRole>();
}