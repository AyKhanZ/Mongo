using System.ComponentModel.DataAnnotations;

namespace Baim_API.Models.Authentication.SignUp;
public class RegisterUser
{
	[Required(ErrorMessage = "Id 1C is required")]
	public string Id1C { get; set; } 
	[Required(ErrorMessage = "User name is required")]
    public string UserName { get; set; }
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }  = string.Empty;   
}