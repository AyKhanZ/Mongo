using Baim_API.Models.Client;
using Baim_API.Models.Company;
using Baim_API.Models.Product;
using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace Baim_API.Controllers;
[ApiController]
[Microsoft.AspNetCore.Mvc.Route("Company")] 
public class CompanyController : ControllerBase
{
	private readonly BaimContext _dbContext;
	private readonly IConfiguration _configuration;
	private readonly SieveProcessor _sieveProcessor;

	public CompanyController(BaimContext dbContext,
		SieveProcessor sieveProcessor,
		IConfiguration configuration)
	{
		_dbContext = dbContext;
		_configuration = configuration;
		_sieveProcessor = sieveProcessor;
	}


	[HttpGet("GetCompanies")]
	public async Task<IActionResult> GetCompanies()
	{
		var companies = await _dbContext.Companies.Include(u => u.Director).ToListAsync();

		return Ok(new { TotalCompaniesCount = companies.Count, Companies = companies });
	}


	[HttpGet("GetCompanyById/{id}")]
	public async Task<ActionResult<Company>> GetCompanyById(int id)
	{
		var company = await _dbContext.Companies.Include(c => c.Director).FirstOrDefaultAsync(c => c.Id == id);

		if (company == null) return NotFound();

		return Ok(company);
	}


	[HttpPost("AddCompany")]
	public async Task<ActionResult<Company>> AddCompany([FromBody]CompanyModel companyModel)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);

		var existingCompany = await _dbContext.Products.FirstOrDefaultAsync(p => p.Name == companyModel.Name);
		if (existingCompany != null)
		{
			ModelState.AddModelError("Id", "Company with this name already exists.");
			return BadRequest(ModelState);
		}

		try
		{
			string[] imageParts = companyModel.Image?.Split(',')!;
			if (imageParts == null || imageParts.Length != 2) return BadRequest("Invalid image format.");

			string imageType = imageParts[0] + ",";
			byte[] imageBytes = Convert.FromBase64String(imageParts[1]);

			var director = await _dbContext.Clients.FirstOrDefaultAsync(c => c.Id == companyModel.DirectorId);

			if (director == null) return BadRequest("Director is not registered!");
			Company company = new Company()
			{
				Id1C = companyModel.Id1C,
				Name = companyModel.Name,
				Description = companyModel.Description,
				Image = imageBytes,
				ImageType = imageType,
				VOEN = companyModel.VOEN,
				TypeOfActivity = companyModel.TypeOfActivity,
				StartDate = companyModel.StartDate,
				DirectorId = companyModel.DirectorId,
				Director = director,
			};

			_dbContext.Companies.Add(company);
			await _dbContext.SaveChangesAsync();

			return CreatedAtAction(nameof(GetCompanyById), new { id = company.Id }, company);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while saving the product.");
		}
	}



	[HttpPut("UpdateCompanyData")]
	public async Task<ActionResult<Company>> UpdateCompanyData([FromBody]CompanyModel companyModel)
	{
		var updatedCompany = await _dbContext.Companies.FirstOrDefaultAsync(c => c.Name == companyModel.Name);
		  
		var existingCompany = await _dbContext.Companies.FirstOrDefaultAsync(c => c.Name == companyModel.Name);

		if (existingCompany == null) return NotFound("Company not found.");
		try
		{
			_dbContext.Entry(existingCompany).CurrentValues.SetValues(updatedCompany!);
			await _dbContext.SaveChangesAsync();

			return Ok(existingCompany);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while updating the company.");
		}
	}



	[HttpDelete("ById/{id}")]
	public async Task<ActionResult> DeleteCompanyById(int id)
	{
		var company = await _dbContext.Companies.FindAsync(id);

		if (company == null) return NotFound("Product not found.");

		_dbContext.Companies.Remove(company);
		await _dbContext.SaveChangesAsync();

		return NoContent();
	}
}