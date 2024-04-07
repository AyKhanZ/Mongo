using System.ComponentModel.DataAnnotations;
namespace Baim_API.Models.Authentication.Login;

public class LoginUser
{
	[Required(ErrorMessage = "User name is required")]
	public string UserName { get; set; }
	[Required(ErrorMessage = "Email is required")]
	public string Email { get; set; }
	[Required(ErrorMessage = "Password is required")]
	public string Password { get; set; }
    public bool RememberMe { get; set; } = false;
}