using System.Text.Json.Serialization;

namespace DB.Models;

public class Product
{ 
    public int Id { get; set; }
	public string Id1C { get; set; } = string.Empty;
	public string Name { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	public byte[]? Image { get; set; } 
	public bool IsPublic { get; set; } = false;
	public string ProductType { get; set; } = string.Empty;
	[JsonIgnore]
	public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
}