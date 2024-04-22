using Baim_API.Models.Partner;
using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sieve.Services;

namespace Baim_API.Controllers;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("Partner")]
public class PartnerController : ControllerBase
{
	private readonly BaimContext _dbContext;
	private readonly IConfiguration _configuration;
	private readonly SieveProcessor _sieveProcessor;

	public PartnerController(BaimContext dbContext,
		SieveProcessor sieveProcessor,
		IConfiguration configuration)
	{
		_dbContext = dbContext;
		_configuration = configuration;
		_sieveProcessor = sieveProcessor;
	}


	[HttpGet("Partners")]
	public async Task<IActionResult> GetPartners()
	{
		var partners = await _dbContext.Partners.ToListAsync();

		return Ok(partners);
	}


	[HttpGet("GetPartnerById/{id}")]
	public async Task<ActionResult<Partner>> GetPartnerById(int id)
	{
		var partner = await _dbContext.Partners.FirstOrDefaultAsync(c => c.Id == id);

		if (partner == null) return NotFound();

		return Ok(partner);
	}


	[HttpPost("AddPartner")]
	public async Task<ActionResult<Partner>> AddPartner([FromBody] PartnerModel partnerModel)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);

		var existingPartner = await _dbContext.Partners.FirstOrDefaultAsync(p => p.Name == partnerModel.Name);
		if (existingPartner != null)
		{
			ModelState.AddModelError("Id", "Partner with this name already exists.");
			return BadRequest(ModelState);
		}

		try
		{
			string[] imageParts = partnerModel.Image?.Split(',')!;
			if (imageParts == null || imageParts.Length != 2) return BadRequest("Invalid image format.");

			string imageType = imageParts[0] + ",";
			byte[] imageBytes = Convert.FromBase64String(imageParts[1]); 

			Partner partner = new Partner()
			{
				Id1C = partnerModel.Id1C,
				Name = partnerModel.Name,
				Description = partnerModel.Description,
				Image = imageBytes,
				ImageType = imageType,
				TypeOfActivity = partnerModel.TypeOfActivity,
			};

			_dbContext.Partners.Add(partner);
			await _dbContext.SaveChangesAsync();

			return CreatedAtAction(nameof(GetPartnerById), new { id = partner.Id }, partner);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while saving the product.");
		}
	}


	[HttpPut("UpdatePartnerData")]
	public async Task<ActionResult<Partner>> UpdatePartnerData([FromBody] PartnerModel partnerModel)
	{
		var existingPartner = await _dbContext.Partners.FirstOrDefaultAsync(c => c.Name == partnerModel.Name);

		if (existingPartner == null) return NotFound("Partner not found.");

		try
		{
			string[] imageParts = partnerModel.Image?.Split(',')!;
			if (imageParts == null || imageParts.Length != 2) return BadRequest("Invalid image format.");

			string imageType = imageParts[0] + ",";
			byte[] imageBytes = Convert.FromBase64String(imageParts[1]);

			existingPartner.Id1C = partnerModel.Id1C;
			existingPartner.Description = partnerModel.Description;
			existingPartner.Name = partnerModel.Name;
			existingPartner.Image = imageBytes;
			existingPartner.ImageType = imageType;
			existingPartner.TypeOfActivity = partnerModel.TypeOfActivity;

			await _dbContext.SaveChangesAsync();

			return Ok(existingPartner);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while updating the partner.");
		}
	} 


	[HttpDelete("ById/{id}")]
	public async Task<ActionResult> DeletePartnerById(int id)
	{
		var partner = await _dbContext.Partners.FindAsync(id);

		if (partner == null) return NotFound("Partner not found.");

		_dbContext.Partners.Remove(partner);
		await _dbContext.SaveChangesAsync();

		return NoContent();
	}
}