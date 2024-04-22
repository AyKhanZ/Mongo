using System.Text.Json.Serialization;

namespace DB.Models;
public class Company
{
	public int Id { get; set; }
	public string? Id1C { get; set; }
	public string Name { get; set; }
	public string VOEN { get; set; }
	public string? TypeOfActivity { get; set; }
	public string? Description { get; set; }
	public string? Address { get; set; }
	public DateTime? StartDate { get; set; }

    public int? DirectorId { get; set; }
	[JsonIgnore]
    public Client? Director { get; set; }


	public string CombinedImage => $"{ImageType}{Convert.ToBase64String(Image!)}";
	[JsonIgnore]
	public byte[]? Image { get; set; }
	[JsonIgnore]
	public string ImageType { get; set; } = "data:image/png;base64,";

    [JsonIgnore]
    public List<Project>? Projects { get; set; }
}