using Baim_API.Models.Authentication.Login;
using Baim_API.Models.Authentication.SignUp;
using Baim_API.Validations;
using Bussines.Models;
using Bussines.Services.Classes;
using Bussines.Services.Interfaces;
using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.V5.Pages.Account.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Web;

namespace Baim_API.Controllers;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("Authentication")]
public class AuthenticationController : ControllerBase
{
	private readonly BaimContext _dbContext;
	private readonly UserManager<AspNetUser> _userManager;
	private readonly RoleManager<IdentityRole> _roleManager;
	private readonly SignInManager<AspNetUser> _signInManager;
	private readonly IUserStore<AspNetUser> _userStore;
	private readonly IConfiguration _configuration;
	private readonly IEmailService _emailService;

	public AuthenticationController(BaimContext dbContext,
		UserManager<AspNetUser> userManager,
		IUserStore<AspNetUser> userStore,
		SignInManager<AspNetUser> signInManager,
		RoleManager<IdentityRole> roleManager,
		IConfiguration configuration,
		IEmailService emailService)
	{
		_dbContext = dbContext;
		_userManager = userManager;
		_userStore = userStore;
		_signInManager = signInManager;
		_roleManager = roleManager;
		_configuration = configuration;
		_emailService = emailService;
	}


	[HttpPost("Registration")]
	public async Task<IActionResult> Registration([FromBody] RegisterUser model)
	{
		string role = "User";
		if (!ModelState.IsValid) return BadRequest("Invalid model state");

		var emailCheckResult = AuthValidation.CheckEmail(model.Email);
		if (emailCheckResult == false) return BadRequest("Invalid email format !");

		model.Password = "ARnold151618&";
		//model.Password = GeneratePassword.GenerateTemporaryPassword();

		if (await _dbContext.Users.AnyAsync(a => a.Email == model.Email)) return BadRequest("User already exists");

		var newUser = new AspNetUser
		{
			Id1C = model.Id1C,
			Email = model.Email,
			UserName = model.UserName,
			NormalizedEmail = model.Email.ToUpper(),
			Role = role
		};

		var result = new IdentityResult();
		if (await _roleManager.RoleExistsAsync(role))
		{
			await _userStore.SetUserNameAsync(newUser, model.Email, CancellationToken.None);
			await _userManager.GetUserIdAsync(newUser);
			result = await _userManager.CreateAsync(newUser, model.Password);

			if (!result.Succeeded)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					new Response { Status = "Error", Message = "User failed to create!" });
			}
			await _userManager.AddToRoleAsync(newUser, role);

			var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
			var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = newUser.Email }, Request.Scheme);
			if (confirmationLink != null)
			{
				var message = new Message(new string[] { newUser.Email }, "Confirmation email and password setup", confirmationLink);

				message.HtmlFilePath = "./wwwroot/index.html";
				_emailService.SendEmail(message, confirmationLink);
				return StatusCode(StatusCodes.Status200OK,
						new Response { Status = "Success", Message = $"User created & email sent to {newUser.Email} Successfully! " });
			}
			return StatusCode(StatusCodes.Status500InternalServerError,
					new Response { Status = "Error", Message = "Confirmation link does not exist!" });
		}
		else
		{
			return StatusCode(StatusCodes.Status500InternalServerError,
					new Response { Status = "Error", Message = "This role does not exist!" });
		}
	}

	[HttpPost("Login")]
	public async Task<IActionResult> Login([FromBody] LoginUser model)
	{
		if (ModelState.IsValid)
		{
			var user = await _userManager.FindByEmailAsync(model.Email);
			if (user != null)
			{
				if (!await _userManager.IsEmailConfirmedAsync(user)) return BadRequest("Email is not confirmed");

				var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
				if (result.Succeeded)
				{
					var roles = await _userManager.GetRolesAsync(user);
					var role = roles.FirstOrDefault();

					if (role == null) return BadRequest("User does not have any roles!");

					var tokenString = AuthService.GenerateTokenString(user, role, _configuration);
					return Ok(new { UserId = user.Id, Token = tokenString });
				}
				return BadRequest("Invalid login attempt");
			}
		}
		return BadRequest("Not valid attempt");
	}

	// GetRedirect
	[HttpGet("ConfirmEmail")]
	public async Task<IActionResult> ConfirmEmail(string token, string email)
	{
		var user = await _userManager.FindByEmailAsync(email);

		if (user != null)
		{
			var result = await _userManager.ConfirmEmailAsync(user, token);
			if (result.Succeeded)
			{
				return Redirect($"http://localhost:3000/email-confirmed"); 
			}
			else return BadRequest("Confirmation failed");
		}
		return StatusCode(StatusCodes.Status500InternalServerError,
					new Response { Status = "Error", Message = "This user does not exist" });
	} 







	[HttpPut("ChangePassword")]
	public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
	{
		var user = await _dbContext.Users.FirstOrDefaultAsync(p => p.Id1C == model.Id1C);
		if (user == null) return BadRequest("User not found");

		var passwordCheckResult = AuthValidation.CheckPassword(model.NewPassword);
		if (passwordCheckResult == false) return BadRequest("Password must be more than 6 and less than 40 characters long and special symbol");

		var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

		if (!result.Succeeded) return BadRequest("Failed to change password");

		return Ok("Password changed successfully");
	}



	[HttpPost("forgot-password")]
	[AllowAnonymous]
	public async Task<IActionResult> ForgotPassword([Required] string email)
	{
		var user = await _userManager.FindByEmailAsync(email);
		if (user != null)
		{
			var token = await _userManager.GeneratePasswordResetTokenAsync(user);
			var forgotPasswordLink = Url.Action(nameof(ResetPassword), "Authentication", new { token, email = user.Email }, Request.Scheme);
			if (forgotPasswordLink != null)
			{
				var message = new Message(new string[] { user.Email! }, "Forgot password link", forgotPasswordLink);

				message.HtmlFilePath = "./wwwroot/ForgotPasswordLink.html";
				_emailService.SendEmail(message, forgotPasswordLink);
				return StatusCode(StatusCodes.Status200OK,
						new Response { Status = "Success", Message = $"Password change request is sent on email {user.Email} .Please open the email & click the link " });
			}
			return StatusCode(StatusCodes.Status500InternalServerError,
					new Response { Status = "Error", Message = "Could not sent link to email,please try again" });
		}
		return BadRequest("Email cound not found");
	}

	[HttpGet("reset-password")]
	public async Task<IActionResult> ResetPassword(string token, string email)
	{
		var model = new ResetPassword { Token = token, Email = email };
		return Ok(new
		{
			model
		});
	}

	[HttpPost("reset-password")]
	[AllowAnonymous]
	public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
	{
		var user = await _userManager.FindByEmailAsync(resetPassword.Email);
		if (user != null)
		{
			var resetPasswordResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);

			if (!resetPasswordResult.Succeeded)
			{
				foreach (var error in resetPasswordResult.Errors)
				{
					ModelState.AddModelError(error.Code, error.Description);
				}
				return Ok(ModelState);
			}
			return StatusCode(StatusCodes.Status200OK,
					new Response { Status = "Success", Message = "Password has been change" });
		}
		return StatusCode(StatusCodes.Status400BadRequest,
				new Response { Status = "Error", Message = "Could not sent link to email,please try again" });
	}



	[HttpGet("Users")]
	public async Task<IActionResult> GetUsers()
	{
		try
		{
			var users = await _userManager.Users.ToListAsync();
			return Ok(users);
		}
		catch (Exception ex)
		{
			return StatusCode(StatusCodes.Status500InternalServerError, $"Failed to get users: {ex.Message}");
		}
	}

	// GET: api/User/ById1C/{id1C}
	[HttpGet("ById1C/{id1C}")]
	public async Task<ActionResult<Product>> GetUserById1C(string id1C)
	{
		var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id1C == id1C);

		if (user == null) return NotFound();

		return Ok(user);
	}

	// GET: api/User/ById1C/{id1C}
	[HttpGet("ById/{id}")]
	public async Task<ActionResult<Product>> GetUserById(string id)
	{
		var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

		if (user == null) return NotFound();

		return Ok(user);
	}

}