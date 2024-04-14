using Baim_API.Models.Product;
using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace Baim_API.Controllers;
[ApiController]
[Route("Product")]
public class ProductController : Controller
{  
	private readonly BaimContext _dbContext;
	private readonly SieveProcessor _sieveProcessor;

	public ProductController(BaimContext dbContext,
			SieveProcessor sieveProcessor)
	{
		_dbContext = dbContext;
		_sieveProcessor = sieveProcessor;
	}



	[HttpGet("")]
	public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] SieveModel model)
	{
		var products = _dbContext.Products.AsQueryable();
		products = _sieveProcessor.Apply(model, products);

		return Ok(products);
	}

	[HttpGet("ById/{id}")]
	public async Task<ActionResult<Product>> GetProductById(int id)
	{
		var product = await _dbContext.Products.FindAsync(id);

		if (product == null) return NotFound(); 

		return Ok(product);
	}

	[HttpGet("ById1C/{id1C}")]
	public async Task<ActionResult<Product>> GetProductById1C(string id1C)
	{
		var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id1C == id1C);

		if (product == null) return NotFound();

		return Ok(product);
	}
	 


	[HttpPost("")]
	public async Task<ActionResult<Product>> AddProduct(ProductModel productModel)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);

		var existingProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id1C == productModel.Id1C);
		if (existingProduct != null)
		{
			ModelState.AddModelError("Id1C", "Product with this Id1C already exists.");
			return BadRequest(ModelState);
		}

		try
		{
			string imageType = productModel.Image!.Split(',')[0] + ","; 
			byte[] imageBytes = Convert.FromBase64String(productModel.Image!.Split(',')[1]); 

			Product product = new Product() 
			{
				Id1C = productModel.Id1C,
				Name = productModel.Name,
				Description= productModel.Description,
				Image = imageBytes,
				ImageType = imageType,
				IsPublic = productModel.IsPublic,
				ProductType = productModel.ProductType,
			}; 

			_dbContext.Products.Add(product);
			await _dbContext.SaveChangesAsync();

			return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while saving the product.");
		}
	}




	[HttpPut("ById/{id}")]
	public async Task<ActionResult<Product>> UpdateProduct(int id, ProductModel productModel)
	{
		string imageType = productModel.Image!.Split(',')[0] + ","; 
		byte[] imageBytes = Convert.FromBase64String(productModel.Image!.Split(',')[1]); 

		Product updatedProduct = new Product()
		{
			Id = productModel.Id,
			Id1C = productModel.Id1C,
			Name = productModel.Name,
			Description = productModel.Description,
			Image = imageBytes,
			ImageType = imageType,
			IsPublic = productModel.IsPublic,
			ProductType = productModel.ProductType,
		};

		if (id != updatedProduct.Id)
		{
			return BadRequest("ID in the request body doesn't match the ID in the URL.");
		}

		if (!ModelState.IsValid) return BadRequest(ModelState);

		var existingProduct = await _dbContext.Products.FindAsync(id);

		if (existingProduct == null) return NotFound("Product not found.");

		try
		{
			_dbContext.Entry(existingProduct).CurrentValues.SetValues(updatedProduct);
			await _dbContext.SaveChangesAsync();

			return Ok(existingProduct);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while updating the product.");
		}
	}

	[HttpPut("ById1C/{id1C}")]
	public async Task<ActionResult<Product>> UpdateProductById1C(string id1C, Product updatedProduct)
	{
		if (id1C != updatedProduct.Id1C)
		{
			return BadRequest("Id1C in the request body doesn't match the Id1C in the URL.");
		}

		if (!ModelState.IsValid) return BadRequest(ModelState);

		var existingProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id1C == id1C);

		if (existingProduct == null) return NotFound("Product not found.");

		try
		{
			_dbContext.Entry(existingProduct).CurrentValues.SetValues(updatedProduct);
			await _dbContext.SaveChangesAsync();

			return Ok(existingProduct);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while updating the product.");
		}
	}



	[HttpDelete("ById/{id}")]
	public async Task<ActionResult> DeleteProductById(int id)
	{
		var product = await _dbContext.Products.FindAsync(id);

		if (product == null) return NotFound("Product not found.");

		_dbContext.Products.Remove(product);
		await _dbContext.SaveChangesAsync();

		return NoContent();
	}

	[HttpDelete("ById1C/{id1C}")]
	public async Task<ActionResult> DeleteProductById1C(string id1C)
	{
		var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id1C == id1C);

		if (product == null) return NotFound("Product not found.");

		_dbContext.Products.Remove(product);
		await _dbContext.SaveChangesAsync();

		return NoContent();
	}
}
