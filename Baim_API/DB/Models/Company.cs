using System.Text.Json.Serialization;

namespace DB.Models;
public class Company
{
	public int Id { get; set; }
	public string? Id1C { get; set; }
	public string CompanyName { get; set; }
	public string VOEN { get; set; }
	public string? TypeOfActivity { get; set; }
    public DateTime? StartDate { get; set; }
	public string? Address { get; set; }
	[JsonIgnore]
    public string? DirectorId { get; set; }
	[JsonIgnore]
    public Client? Director { get; set; }
}