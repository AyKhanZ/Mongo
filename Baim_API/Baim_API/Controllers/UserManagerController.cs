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
using Baim_API.Models.UserManagement;

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


		//[HttpGet("GetUsers")]
		//public async Task<IActionResult> GetUsers([FromQuery] SieveModel model)
		//{
		//	var quantity = await _dbContext.Users.CountAsync();
		//	var users = _dbContext.Users.AsQueryable();
		//	users = _sieveProcessor.Apply(model, users);

		//	var response = new
		//	{
		//		TotalUsersCount = quantity,
		//		Users = users
		//	};

		//	return Ok(response);
		//}



		[HttpGet("GetUsers")]
		public async Task<IActionResult> GetUsers([FromQuery] SieveModel model, string? orFilter = null)
		{
			var usersQuery = _dbContext.Users.AsQueryable();
			var quantity = usersQuery.Count();

			usersQuery = _sieveProcessor.Apply(model, usersQuery);
			var filteredCount = 0;

			if (!string.IsNullOrEmpty(orFilter))
			{
				var orFilters = orFilter.Split('|');
				foreach (var filter in orFilters)
				{
					var filterParts = filter.Split("@=");
					if (filterParts.Length == 2)
					{ 
						var value = filterParts[1]; 
						usersQuery = usersQuery.Where(u => EF.Functions.Like(u.UserName, $"%{value}%")
															|| EF.Functions.Like(u.LastName, $"%{value}%")
															|| EF.Functions.Like(u.Email, $"%{value}%"));
						filteredCount = usersQuery.Count();
					}
				}
			}

			var users = await usersQuery.ToListAsync();

			var response = new
			{
				TotalUsersCount = quantity,
				TotalFilteredCount = filteredCount,
				Users = users
			};

			return Ok(response);
		}
	}
}
