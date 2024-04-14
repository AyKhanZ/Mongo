using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Baim_API.Models.Client;
using Sieve.Models;
using Baim_API.Models.Product;

namespace Baim_API.Controllers;
[ApiController]
[Microsoft.AspNetCore.Mvc.Route("Client")]
public class ClientController : ControllerBase
{
	private readonly BaimContext _dbContext;

	public ClientController(BaimContext dbContext)
	{
		_dbContext = dbContext;
	}

	[HttpPost("AddPersonalData")]
	public async Task<IActionResult> AddPersonalData([FromBody] ClientModel model)
	{
		if (!ModelState.IsValid) return BadRequest("Invalid model state");

		var user = await _dbContext.Users.FirstOrDefaultAsync(c => c.Email == model.Email);
		if (user == null) return BadRequest("Not found user with this email");

		user.Patronimic = model.Patronimic;
		user.PhoneNumber = model.PhoneNumber;
		user.Image = model.Image;
		user.BirthDate = model.BirthDate;
		user.Gender = model.Gender;
		user.Age = model.Age;

		var existingClient = await _dbContext.Clients.Include(c => c.Company).FirstOrDefaultAsync(c => c.UserId == user.Id);
		if (existingClient != null)
		{
			existingClient.PersonalEmail = model.PersonalEmail;
			existingClient.BusinessPhoneNumber = model.BusinessPhoneNumber;
			if (existingClient.Company != null)
			{
				existingClient.Company.CompanyName = model.CompanyName;
				existingClient.Company.VOEN = model.VOEN;
				existingClient.Company.TypeOfActivity = model.TypeOfActivity;
				existingClient.Company.StartDate = model.StartDate;
				existingClient.Company.Address = model.Address;
			}
			else
			{
				existingClient.Company = new Company
				{
					CompanyName = model.CompanyName,
					VOEN = model.VOEN,
					TypeOfActivity = model.TypeOfActivity,
					StartDate = model.StartDate,
					Address = model.Address
				};
			}
		}
		else return StatusCode(400, "Client Does not exist! ");

		try
		{
			await _dbContext.SaveChangesAsync();
			return Ok();
		}
		catch (DbUpdateException ex) { 
			return StatusCode(500, "Error occurred while updating the data.");
		}
	}


	[HttpGet("ById/{id}")]
	public async Task<ActionResult<Client>> GetClientById(int id)
	{
		var client = await _dbContext.Clients.Include(c=>c.User).Include(c => c.Company).FirstOrDefaultAsync(c => c.Id == id);

		if (client == null) return NotFound();

		return Ok(client);
	}

	[HttpGet("ByEmail/{email}")]
	public async Task<ActionResult<Client>> GetClientByEmail(string email)
	{
		var client = await _dbContext.Clients.Include(c => c.Company).FirstOrDefaultAsync(c => c.User.Email == email);

		if (client == null) return NotFound();

		return Ok(client);
	}
}  