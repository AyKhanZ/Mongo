using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Baim_API.Models.Client;
using Sieve.Models;
using Baim_API.Models.Product;
using Microsoft.AspNetCore.Identity;
using Sieve.Services;

namespace Baim_API.Controllers;
[ApiController]
[Microsoft.AspNetCore.Mvc.Route("Client")]
public class ClientController : ControllerBase
{
	private readonly BaimContext _dbContext;
	private readonly IConfiguration _configuration;
	private readonly SieveProcessor _sieveProcessor;

	public ClientController(BaimContext dbContext,
		SieveProcessor sieveProcessor,
		IConfiguration configuration)
	{
		_dbContext = dbContext;
		_configuration = configuration;
		_sieveProcessor = sieveProcessor;
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



	[HttpPut("ActiveById/{id}")]
	public async Task<ActionResult<Client>> UpdateById(int id, bool isActive)
	{
		var updatedClient = await _dbContext.Clients.FirstOrDefaultAsync(c => c.Id == id);

		updatedClient!.IsPublic = isActive;

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


	[HttpPut("UpdateData")]
	public async Task<IActionResult> UpdateData([FromBody] ClientModel model)
	{
		if (!ModelState.IsValid) return BadRequest("Invalid model state");

		var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
		if (user == null) return NotFound("User not found");

		user.Patronimic = model.Patronimic;
		user.PhoneNumber = model.PhoneNumber;
		user.Image = model.Image;
		user.BirthDate = model.BirthDate;
		user.Gender = model.Gender;
		user.Age = model.Age;

		var client = await _dbContext.Clients.Include(c => c.Company).FirstOrDefaultAsync(c => c.UserId == user.Id);
		if (client == null) return NotFound("Client not found");

		client.UserId = user.Id;
		client.PersonalEmail = model.PersonalEmail;
		client.BusinessPhoneNumber = model.BusinessPhoneNumber;

		if (client.Company != null)
		{
			client.Company.Name = model.CompanyName;
			client.Company.VOEN = model.VOEN;
			client.Company.TypeOfActivity = model.TypeOfActivity;
			client.Company.StartDate = model.StartDate;
			client.Company.Address = model.Address;
		}
		else
		{
			var company = new Company
			{
				Name = model.CompanyName,
				VOEN = model.VOEN,
				TypeOfActivity = model.TypeOfActivity,
				StartDate = model.StartDate,
				Address = model.Address
			};
			_dbContext.Companies.Add(company);
			client.Company = company;
			client.CompanyId = company.Id;
		}

		try
		{
			await _dbContext.SaveChangesAsync();
			return Ok("Data updated successfully");
		}
		catch (Exception ex)
		{ 
			return StatusCode(500, "An error occurred while updating the data");
		}
	}


	[HttpGet("Id/{id}")]
	public async Task<ActionResult<Client>> GetById(int id)
	{
		var client = await _dbContext.Clients.Include(c=>c.User).Include(c => c.Company).FirstOrDefaultAsync(c => c.Id == id);

		if (client == null) return NotFound();

		return Ok(client);
	}

	[HttpGet("Email/{email}")]
	public async Task<ActionResult<Client>> GetByEmail(string email)
	{
		var client = await _dbContext.Clients.Include(c => c.Company).Include(c => c.User).FirstOrDefaultAsync(c => c.User.Email == email);

		if (client == null) return NotFound();

		return Ok(client);
	}

}  