using DB.Models;

namespace Baim_API.Models.UserManagement;
public class UserManagement : AspNetUser
{
	public int Quantity { get; set; }
}
