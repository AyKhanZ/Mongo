using DB.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Bussines.Services.Classes;
public static class AuthService
{
	public static string GenerateTokenString(AspNetUser user, string role,IConfiguration _configuration)
	{
		var claims = new List<Claim>
		{
			new Claim(ClaimTypes.Email,user.UserName),
			new Claim(ClaimTypes.NameIdentifier,user.Id),
			new Claim(ClaimTypes.Role, role),
		};

		var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

		var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

		var securityToken = new JwtSecurityToken(
			claims: claims,
			expires: DateTime.Now.AddMinutes(60),
			issuer: _configuration["Jwt:Issuer"],
			audience: _configuration["Jwt:Audience"],
			signingCredentials: signingCred);

		string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
		return tokenString;
	}

}
