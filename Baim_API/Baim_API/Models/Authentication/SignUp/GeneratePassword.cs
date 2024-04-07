using System.Text;
namespace Baim_API.Models.Authentication.SignUp;
public static class GeneratePassword
{
	public static string GenerateTemporaryPassword()
	{
		Random random = new Random();

		string validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

		StringBuilder temporaryPassword = new StringBuilder();

		for (int i = 0; i < 10; i++)
		{
			int index = random.Next(validChars.Length);

			temporaryPassword.Append(validChars[index]);
		}

		while (temporaryPassword.Length < 6 || temporaryPassword.Length > 40)
		{
			temporaryPassword.Clear();

			for (int i = 0; i < 10; i++)
			{
				int index = random.Next(validChars.Length);
				temporaryPassword.Append(validChars[index]);
			}
		}

		return temporaryPassword.ToString();
	}
}