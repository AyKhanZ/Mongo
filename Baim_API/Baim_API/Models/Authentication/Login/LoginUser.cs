using System.ComponentModel.DataAnnotations;
namespace Baim_API.Models.Authentication.Login;

public class LoginUser
{
	[Required(ErrorMessage = "Email is required")]
	public string Email { get; set; }
	[Required(ErrorMessage = "Password is required")]
	public string Password { get; set; } = string.Empty;
    public bool RememberMe { get; set; } = false;
}