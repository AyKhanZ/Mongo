using System.ComponentModel.DataAnnotations;

namespace Baim_API.Models.Authentication.Login;
public class ForgotPasswordRequest
{
	[Required]
	public string Email { get; set; }
}
