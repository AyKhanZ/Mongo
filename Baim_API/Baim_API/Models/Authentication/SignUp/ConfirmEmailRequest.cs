namespace Baim_API.Models.Authentication.SignUp;
public class ConfirmEmailRequest
{
	public string Token { get; set; }
	public string Email { get; set; }
}