using MailKit.Net.Smtp;
using MimeKit;
using Bussines.Models;
using Bussines.Services.Interfaces;

namespace Bussines.Services.Classes;
public class EmailService : IEmailService
{
	private readonly EmailConfiguration _emailConfig;
    public EmailService(EmailConfiguration emailConfig) => _emailConfig = emailConfig;
    public void SendEmail(Message message, string confirmLink)
	{
		var emailMessage = CreateEmailMessage(message, confirmLink);
		Send(emailMessage);
	}
	//private MimeMessage CreateEmailMessage(Message message)
	//{
	//	var emailMessage = new MimeMessage();
	//	emailMessage.From.Add(new MailboxAddress("email",_emailConfig.From));
	//	emailMessage.To.AddRange(message.To);
	//	emailMessage.Subject = message.Subject;
	//	emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };

	//	return emailMessage;
	//} 
	private MimeMessage CreateEmailMessage(Message message,string confirmLink)
	{
		var emailMessage = new MimeMessage();
		emailMessage.From.Add(new MailboxAddress("Baim", _emailConfig.From));  
		emailMessage.To.AddRange(message.To);
		emailMessage.Subject = message.Subject;
		 
		string htmlContent = File.ReadAllText(message.HtmlFilePath);
		htmlContent = htmlContent.Replace("{{Link}}", confirmLink);

		var bodyBuilder = new BodyBuilder();
		bodyBuilder.HtmlBody = htmlContent;   

		emailMessage.Body = bodyBuilder.ToMessageBody();

		return emailMessage;
	}

	private void Send(MimeMessage mailMessage) 
	{
		using var client = new SmtpClient();
		try
		{
			client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
			client.AuthenticationMechanisms.Remove("XOAUTH2");
			client.Authenticate(_emailConfig.UserName, _emailConfig.Password);

			client.Send(mailMessage);
		}
		catch
		{
			throw;
		}
		finally 
		{
			client.Disconnect(true); 
			client.Dispose(); 
		}
	} 
}
