using Bussines.Models;

namespace Bussines.Services.Interfaces;
public interface IEmailService
{
	void SendEmail(Message message, string confirmLink);

}
