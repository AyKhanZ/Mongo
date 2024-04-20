namespace DB.Models;
public class PasswordResetToken
{
	public int Id { get; set; }
	public string UserId { get; set; } 
	public string Token { get; set; }
	public DateTime ExpiryDate { get; set; }

	public virtual AspNetUser User { get; set; } 
}