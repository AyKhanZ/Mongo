using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Baim_API.Controllers;
[ApiController]
[Route("Product")]
public class ProductController : Controller
{  
	private readonly BaimContext _dbContext;

	public ProductController(BaimContext dbContext)
	{
		_dbContext = dbContext;
	}

	// GET: api/Product
	[HttpGet("")]
	public async Task<ActionResult<List<Product>>> GetProducts()
	{
		var products = await _dbContext.Products
			//.Where(p => p.IsPublic == true)
			.ToListAsync();

		return Ok(products);
	}

	// GET: api/Product/ById/{id}
	[HttpGet("ById/{id}")]
	public async Task<ActionResult<Product>> GetProductById(int id)
	{
		var product = await _dbContext.Products.FindAsync(id);

		if (product == null) return NotFound();

		return Ok(product);
	}

	// GET: api/Product/ById1C/{id1C}
	[HttpGet("ById1C/{id1C}")]
	public async Task<ActionResult<Product>> GetProductById1C(string id1C)
	{
		var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id1C == id1C);

		if (product == null) return NotFound();

		return Ok(product);
	}
	 

	[HttpPost("")]
	public async Task<ActionResult<Product>> AddProduct(Product product)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);

		var existingProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id1C == product.Id1C);
		if (existingProduct != null)
		{
			ModelState.AddModelError("Id1C", "Product with this Id1C already exists.");
			return BadRequest(ModelState);
		}

		try
		{
			_dbContext.Products.Add(product);
			await _dbContext.SaveChangesAsync();

			return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
		}
		catch (DbUpdateException)
		{
			return StatusCode(500, "Error occurred while saving the product.");
		}
	}

	 
	// PUT: api/Product/ById/{id}
	[HttpPut("ById/{id}")]
	public async Task<ActionResult<Product>> UpdateProduct(int id, Product updatedProduct)
	{
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

	// PUT: api/Product/ById1C/{id1C}
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



	// DELETE: api/Product/ById/{id}
	[HttpDelete("ById/{id}")]
	public async Task<ActionResult> DeleteProductById(int id)
	{
		var product = await _dbContext.Products.FindAsync(id);

		if (product == null) return NotFound("Product not found.");

		_dbContext.Products.Remove(product);
		await _dbContext.SaveChangesAsync();

		return NoContent();
	}

	// DELETE: api/Product/ById1C/{id1C}
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
