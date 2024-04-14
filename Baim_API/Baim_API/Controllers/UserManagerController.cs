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

		[HttpGet("GetUsers")]
		public async Task<IActionResult> GetUsers([FromQuery] SieveModel model, string? orFilter = null)
		{
			var usersQuery = _dbContext.Users.AsQueryable();
			var quantity = usersQuery.Count();

			usersQuery = _sieveProcessor.Apply(model, usersQuery);

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
					}
				}
			}

			var users = await usersQuery.ToListAsync();

			return Ok(new { TotalUsersCount = quantity, Users = users });
		}



		[HttpGet("GetClients")]
		public async Task<IActionResult> GetClients([FromQuery] SieveModel model, string? orFilter = null)
		{
			var usersQuery = _dbContext.Clients.Include(u => u.User).Include(u => u.Company).AsQueryable();

			var quantity = usersQuery.Count();

			usersQuery = _sieveProcessor.Apply(model, usersQuery);

			if (!string.IsNullOrEmpty(orFilter))
			{
				var orFilters = orFilter.Split('|');
				foreach (var filter in orFilters)
				{
					var filterParts = filter.Split("@=");
					if (filterParts.Length == 2)
					{
						var value = filterParts[1];
						usersQuery = usersQuery.Where(u => EF.Functions.Like(u.User.UserName, $"%{value}%")
															|| EF.Functions.Like(u.User.LastName, $"%{value}%")
															|| EF.Functions.Like(u.User.Email, $"%{value}%"));
					}
				}
			}
			var users = await usersQuery.ToListAsync();

			var result = users.Select(c => new { Client = c });

			return Ok(new { TotalClientsCount = quantity, Users = result });
		}


		[HttpGet("GetStaff")]
		public async Task<IActionResult> GetStaff([FromQuery] SieveModel model, string? orFilter = null)
		{
			var usersQuery = _dbContext.Employers.Include(u => u.User).AsQueryable();

			var quantity = usersQuery.Count();

			usersQuery = _sieveProcessor.Apply(model, usersQuery);

			if (!string.IsNullOrEmpty(orFilter))
			{
				var orFilters = orFilter.Split('|');
				foreach (var filter in orFilters)
				{
					var filterParts = filter.Split("@=");
					if (filterParts.Length == 2)
					{
						var value = filterParts[1];
						usersQuery = usersQuery.Where(u => EF.Functions.Like(u.User.UserName, $"%{value}%")
															|| EF.Functions.Like(u.User.LastName, $"%{value}%")
															|| EF.Functions.Like(u.User.Email, $"%{value}%"));
					}
				}
			}
			var users = await usersQuery.ToListAsync();

			var result = users.Select(e => new { Employer = e });

			return Ok(new { TotalStaffCount = quantity, Users = result });
		}


		[HttpPut("ById/{id}")]
		public async Task<ActionResult<Client>> UpdateClientById(int id, bool isActive)
		{
			Client updatedClient = _dbContext.Clients.FirstOrDefault(c => c.Id == id);

			updatedClient.IsPublic = isActive;	

			var existingClient = await _dbContext.Clients.FirstOrDefaultAsync(c => c.Id == id);

			if (existingClient == null) return NotFound("Client not found.");
			try
			{
				_dbContext.Entry(existingClient).CurrentValues.SetValues(updatedClient);
				await _dbContext.SaveChangesAsync();

				return Ok(existingClient);
			}
			catch (DbUpdateException)
			{
				return StatusCode(500, "Error occurred while updating the client.");
			}
		}
	}
}
