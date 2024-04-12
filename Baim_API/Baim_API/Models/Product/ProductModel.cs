using DB.Models;

namespace Baim_API.Models.Product;
public class ProductModel
{
	public int Id { get; set; }
	public string Id1C { get; set; } = string.Empty;
	public string Name { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	public string? Image { get; set; }
	public bool IsPublic { get; set; } = false;
	public string ProductType { get; set; } = string.Empty; 
}