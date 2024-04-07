using DB.Services.Classes;

namespace DB.Models;

public class Order
{
	public int Id { get; set; }
	public DateTime StartDate { get; set; } = DateTime.Now;
	public DateTime DoneDate { get; set; } = DateTime.Now.AddMonths(1);
	public decimal TotalPrice { get; set; }
	public Enums.PaymentMethod PaymentMethod { get; set; } = Enums.PaymentMethod.Cash;
	public Enums.DoneState DoneState { get; set; } = Enums.DoneState.Pending;

	public string UserId { get; set; } = string.Empty;
	public AspNetUser User { get; set; } = new AspNetUser();

	public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
}