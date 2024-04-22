using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DB.Models;
public class Partner
{
	public int Id { get; set; }
	public string Id1C { get; set; }
	public string Name { get; set; }
	public string? TypeOfActivity { get; set; }
	public string? Description { get; set; }
	public string CombinedImage => $"{ImageType}{Convert.ToBase64String(Image!)}";
	[JsonIgnore]
	public byte[]? Image { get; set; }
	[JsonIgnore]
	public string ImageType { get; set; } = "data:image/png;base64,";
}
