namespace DB.Models;
public class OrderProduct 
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; } = new Product();

    public int OrderId { get; set; }
    public Order Order { get; set; } = new Order();
}