using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Sieve.Models;
using Sieve.Services;

namespace Baim_API.Controllers;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("Employer")]
public class EmployerController : ControllerBase
{
	private readonly BaimContext _dbContext;
	private readonly SieveProcessor _sieveProcessor;

	public EmployerController(BaimContext dbContext, SieveProcessor sieveProcessor)
	{
		_dbContext = dbContext;
		_sieveProcessor = sieveProcessor;
	}


	[HttpGet("GetStaff")]
	public async Task<IActionResult> GetStaff([FromQuery] SieveModel model, string? onSearch = null, string? onFilter = null)
	{
		var usersQuery = _dbContext.Employers.Include(u => u.User).AsQueryable();

		var quantity = usersQuery.Count();

		usersQuery = _sieveProcessor.Apply(model, usersQuery);

		var users = await usersQuery.ToListAsync();
		if (!string.IsNullOrEmpty(onSearch))
		{
			var onSearchs = onSearch.Split('|');
			foreach (var filter in onSearchs)
			{
				var filterParts = filter.Split("@=");
				if (filterParts.Length == 2)
				{
					var value = filterParts[1];
					if (!string.IsNullOrEmpty(onFilter))
					{
						usersQuery = usersQuery.Where(u => EF.Functions.Like(u.Position, $"%{onFilter}%") 
														&& (EF.Functions.Like(u.User.UserName, $"%{value}%")
														|| EF.Functions.Like(u.User.LastName, $"%{value}%")
														|| EF.Functions.Like(u.User.Email, $"%{value}%")));
					}
					else usersQuery = usersQuery.Where(u => EF.Functions.Like(u.User.UserName, $"%{value}%")
														 || EF.Functions.Like(u.User.LastName, $"%{value}%")
														 || EF.Functions.Like(u.User.Email, $"%{value}%"));
				}
			}
		}
		else if (!string.IsNullOrEmpty(onFilter))
		{
			usersQuery = usersQuery.Where(u => EF.Functions.Like(u.Position, $"%{onFilter}%"));
		}

		users = await usersQuery.ToListAsync();

		var result = users.Select(e => new { Employer = e });

		return Ok(new { TotalStaffCount = quantity, Users = result });
	}


	[HttpPut("ChangePosition/{email}")]
	public async Task<ActionResult<Employer>> ChangePosition(string email, string position)
	{
		var updatedEmployer = _dbContext.Employers.FirstOrDefault(e => e.User.Email == email);

		updatedEmployer!.Position = position;

		var existingEmployer = await _dbContext.Employers.FirstOrDefaultAsync(e => e.User.Email == email);

		if (existingEmployer == null) return NotFound("Employer not found.");
		try
		{
			_dbContext.Entry(existingEmployer).CurrentValues.SetValues(updatedEmployer);
			await _dbContext.SaveChangesAsync();

			return Ok(existingEmployer);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while updating the client.");
		}
	}


	[HttpPut("Dismiss/{id}")]
	public async Task<ActionResult<Employer>> DismissById(int id, bool isDismissed)
	{
		var updatedEmployer = _dbContext.Employers.FirstOrDefault(c => c.Id == id);

		updatedEmployer!.IsDismissed = isDismissed;

		var existingEmployer = await _dbContext.Employers.FirstOrDefaultAsync(c => c.Id == id);

		if (existingEmployer == null) return NotFound("Employer not found.");
		try
		{
			_dbContext.Entry(existingEmployer).CurrentValues.SetValues(updatedEmployer);
			await _dbContext.SaveChangesAsync();

			return Ok(existingEmployer);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while updating the client.");
		}
	}


	[HttpGet("Id/{id}")]
	public async Task<ActionResult<Employer>> GetById(int id)
	{
		var employer = await _dbContext.Employers.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);

		if (employer == null) return NotFound();

		return Ok(employer);
	}

	[HttpGet("Email/{email}")]
	public async Task<ActionResult<Employer>> GetByEmail(string email)
	{
		var employer = await _dbContext.Employers.Include(c => c.User).FirstOrDefaultAsync(c => c.User.Email == email);

		if (employer == null) return NotFound();

		return Ok(employer);
	}
}
