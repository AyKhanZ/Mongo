using Baim_API.Models.Authentication.Login;
using Baim_API.Models.Authentication.SignUp;
using Baim_API.Validations;
using Bussines.Models;
using Bussines.Services.Classes;
using Bussines.Services.Interfaces;
using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt; 
using System.Security.Cryptography;
using System.Text;

namespace Baim_API.Controllers;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("Authentication")]
public class AuthenticationController : ControllerBase
{
	private readonly BaimContext _dbContext;
	private readonly IConfiguration _configuration;
	private readonly IEmailService _emailService;

	public AuthenticationController(BaimContext dbContext,
		IConfiguration configuration,
		IEmailService emailService)
	{
		_dbContext = dbContext;
		_configuration = configuration;
		_emailService = emailService;
	}


	[HttpPost("Registration")]
	public async Task<IActionResult> Registration([FromBody] RegisterUser model)
	{
		if (!ModelState.IsValid) return BadRequest("Invalid model state");

		var emailCheckResult = AuthValidation.CheckEmail(model.Email);
		if (emailCheckResult == false) return BadRequest("Invalid email format !");

		model.Password = "ARnold151618&";
		//model.Password = GeneratePassword.GenerateTemporaryPassword();

		if (await _dbContext.Users.AnyAsync(u => u.Email == model.Email)) return BadRequest("User already exists");

		var passwordHasher = new PasswordHasher<AspNetUser>();
		var newUser = new AspNetUser
		{
			Email = model.Email,
			UserName = model.Name,
			NormalizedEmail = model.Email.ToUpper(),
			LastName = model.LastName,
			Id1C = model.Id1C,
			Role = model.Role
		};
		newUser.PasswordHash = passwordHasher.HashPassword(newUser, model.Password);


		if (model.Role == "" || model.Role == "Client")
		{
			Client client = new() { User = newUser, UserId = newUser.Id, IsPublic = true };
			newUser.Client = client;
			newUser.ClientId = client.Id;
			await _dbContext.Clients.AddAsync(client);
		}
		else if (model.Role == "Employer")
		{
			Employer employer = new() { User = newUser, UserId = newUser.Id, Position = "Intern" };
			newUser.Employer = employer;
			newUser.EmployerId = employer.Id;
			await _dbContext.Employers.AddAsync(employer);
		}
		else if (model.Role == "Admin") newUser.EmailConfirmed = true;
		else return BadRequest("Role does not exist!");
		await _dbContext.Users.AddAsync(newUser);
		await _dbContext.SaveChangesAsync();


		var token = AuthService.GenerateEmailConfirmationToken(newUser,_configuration);
		var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = newUser.Email }, Request.Scheme);

		if (confirmationLink == null) return BadRequest("Failed to create confirmation tokent");

		var message = new Message(new string[] { newUser.Email }, "Confirmation your email ", confirmationLink);
		message.HtmlFilePath = "./wwwroot/index.html";
		_emailService.SendEmail(message, confirmationLink);

		return Ok(new { Message = $"User created & email sent to {newUser.Email} Successfully! " } );
	}

	[HttpPost("Login")]
	public async Task<IActionResult> Login([FromBody] LoginUser model)
	{
		if (!ModelState.IsValid) return BadRequest("Not valid attempt");
		
		var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
		
		if (user == null) return BadRequest("User not found");

		if (!user.EmailConfirmed) return BadRequest("Email is not confirmed");

		var passwordHasher = new PasswordHasher<AspNetUser>();
		var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash!, model.Password);
		if (result != PasswordVerificationResult.Success) return BadRequest("Incorrect password!");

		var tokenString = AuthService.GenerateJwtToken(user,_configuration);
		return Ok(new {User = user, Token = tokenString });
	}
	 

	[HttpGet("ConfirmEmail")]
	public async Task<IActionResult> ConfirmEmail(string token, string email)
	{
		var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
		if (user == null) return BadRequest("User does't exist!");

		var tokenHandler = new JwtSecurityTokenHandler();
		var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);
		try
		{
			tokenHandler.ValidateToken(token, new TokenValidationParameters
			{
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateIssuer = false,
				ValidateAudience = false,
				ClockSkew = TimeSpan.Zero
			}, out SecurityToken validatedToken);

			var jwtToken = (JwtSecurityToken)validatedToken;
			var userId = jwtToken.Claims.First(x => x.Type == "id").Value;

			if (userId != user.Id.ToString()) return BadRequest("Invalid Token");

			user.EmailConfirmed = true;
			await _dbContext.SaveChangesAsync();

			return Redirect($"http://localhost:3000/email-confirmed");
		}
		catch
		{
			return BadRequest("Invalid Token");
		}
	} 

	[HttpPut("ChangePassword")]
	public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
	{
		var user = await _dbContext.Users.FirstOrDefaultAsync(p => p.Email == model.Email);
		if (user == null) return BadRequest("User not found");

		var passwordCheckResult = AuthValidation.CheckPassword(model.NewPassword);
		if (!passwordCheckResult) return BadRequest("Password must be more than 6 and less than 40 characters long and include a special symbol");

		var passwordHasher = new PasswordHasher<AspNetUser>();
		var verificationResult = passwordHasher.VerifyHashedPassword(user, user.PasswordHash!, model.OldPassword);
		if (verificationResult != PasswordVerificationResult.Success) return BadRequest("Old password is incorrect");

		var newPasswordHash = passwordHasher.HashPassword(user, model.NewPassword);
		user.PasswordHash = newPasswordHash;
		_dbContext.Users.Update(user);
		await _dbContext.SaveChangesAsync();

		return Ok("Password changed successfully");
	}

	 

	[HttpPost("forgot-password")]
	[AllowAnonymous]
	public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
	{
		var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
		if (user == null) return BadRequest("Email could not be found");

		string resetToken = "";
		using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
		{
			var randomBytes = new byte[32];
			rngCryptoServiceProvider.GetBytes(randomBytes);
			resetToken = Convert.ToBase64String(randomBytes);

			var passwordResetEntry = new PasswordResetToken
			{
				UserId = user.Id,
				Token = resetToken,
				ExpiryDate = DateTime.UtcNow.AddHours(24)
			};
			_dbContext.PasswordResetTokens.Add(passwordResetEntry);
			await _dbContext.SaveChangesAsync();
		}
		var resetPasswordUrl = $"http://localhost:3000/resetPassword?token={Uri.EscapeDataString(resetToken)}&email={Uri.EscapeDataString(user.Email)}";

		try
		{
			var message = new Message(new string[] { user.Email }, "Reset password link", resetPasswordUrl);
			message.HtmlFilePath = "./wwwroot/ForgotPasswordLink.html";
			_emailService.SendEmail(message, resetPasswordUrl);
			return Redirect(resetPasswordUrl);
		}
		catch (Exception ex)
		{
			return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Could not send link to email, please try again" });
		}
	}



	[HttpPost("reset-password")]
	[AllowAnonymous]
	public async Task<IActionResult> ResetPassword([FromBody]ResetPassword model)
	{
		var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
		if (user == null) return BadRequest("Invalid request");

		var tokenEntry = await _dbContext.PasswordResetTokens
			.FirstOrDefaultAsync(t => t.Token == model.Token && t.UserId == user.Id);
		if (tokenEntry == null || tokenEntry.ExpiryDate < DateTime.UtcNow) return BadRequest("Invalid or expired password reset token");

		var passwordHasher = new PasswordHasher<AspNetUser>(); 
		user.PasswordHash = passwordHasher.HashPassword(user, model.Password);

		_dbContext.Users.Update(user);
		await _dbContext.SaveChangesAsync();

		_dbContext.PasswordResetTokens.Remove(tokenEntry);	
		await _dbContext.SaveChangesAsync();

		return Ok(new { Message = "Password has been changed successfully." });
	}


	[HttpGet("reset-password")]
	public async Task<IActionResult> ResetPassword(string token, string email)
	{
		var model = new ResetPassword { Token = token, Email = email };

		return Ok(new { model });
	} 

	[HttpGet("Users")]
	public async Task<IActionResult> GetUsers()
	{
		try
		{
			var users = await _dbContext.Users.ToListAsync();
			return Ok(users);
		}
		catch (Exception ex)
		{
			return StatusCode(StatusCodes.Status500InternalServerError, $"Failed to get users: {ex.Message}");
		}
	} 

	[HttpGet("ById/{id}")]
	public async Task<ActionResult<Product>> GetUserById(string id)
	{
		var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

		if (user == null) return NotFound();

		return Ok(user);
	}
}