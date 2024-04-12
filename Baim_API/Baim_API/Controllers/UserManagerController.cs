using Baim_API.Models.Authentication.SignUp;
using Baim_API.Validations;
using Bussines.Models;
using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Web.Http.ModelBinding;
using System;
using Sieve.Models;
using Sieve.Services;
using Microsoft.Extensions.Hosting;

namespace Baim_API.Controllers
{
	public class UserManagerController : Controller
	{
		private readonly BaimContext _dbContext;
		private readonly UserManager<AspNetUser> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly SignInManager<AspNetUser> _signInManager;
		private readonly IUserStore<AspNetUser> _userStore;
		private readonly IConfiguration _configuration;
		private readonly SieveProcessor _sieveProcessor;

		public UserManagerController(BaimContext dbContext,
			UserManager<AspNetUser> userManager,
			IUserStore<AspNetUser> userStore,
			SignInManager<AspNetUser> signInManager,
			RoleManager<IdentityRole> roleManager,
			SieveProcessor sieveProcessor,
			IConfiguration configuration)
		{
			_dbContext = dbContext;
			_userManager = userManager;
			_userStore = userStore;
			_signInManager = signInManager;
			_roleManager = roleManager;
			_configuration = configuration;
			_sieveProcessor = sieveProcessor; 
		}


		[HttpGet("GetUsers")]
		public async Task<IActionResult> GetUsers([FromQuery] SieveModel model)
		{
			var users = _dbContext.Users.AsQueryable();
			users = _sieveProcessor.Apply(model, users);
			 
			return Ok(users);
		}
	}
}
