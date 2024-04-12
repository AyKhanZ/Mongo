using Sieve.Attributes;
using System.Text.Json.Serialization;

namespace DB.Models;

public class Product
{ 
    public int Id { get; set; }
	[Sieve(CanFilter = true, CanSort = true)]
	public string Id1C { get; set; } = string.Empty;
	public string Name { get; set; } = string.Empty;
	public string Description { get; set; } = string.Empty;
	[Sieve(CanFilter = true, CanSort = true)]
	public bool IsPublic { get; set; } = false;
	[Sieve(CanFilter = true, CanSort = true)]
	public string ProductType { get; set; } = string.Empty;
	public string CombinedImage => $"{ImageType}{Convert.ToBase64String(Image)}";
	[JsonIgnore]
	public byte[] Image { get; set; } 
	[JsonIgnore]
	public string ImageType { get; set; } = "data:image/png;base64,";
	[JsonIgnore]
	public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
}