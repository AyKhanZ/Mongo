namespace DB.Models;
public class UserRole
{
    public int Id { get; set; }

	public string UserId { get; set; } = string.Empty;
	public AspNetUser User { get; set; } = new AspNetUser();	


	public int MissionId { get; set; }
	public Mission Mission { get; set; } = new Mission();

	public List<Role> Roles { get; set; } = new List<Role>();
}
 