using Bussines.Models;
using Bussines.Services.Classes;
using Bussines.Services.Interfaces;
using DB.DbContexts;
using DB.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Sieve.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = builder.Configuration;
var connectionString = configuration.GetConnectionString("BAIM") ?? throw new InvalidOperationException("Connection string 'BaimContext' not found.");
builder.Services.AddDbContext<BaimContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddSingleton<AspNetUser>();	
builder.Services.AddSingleton<SieveProcessor>();

builder.Services.AddIdentity<AspNetUser, IdentityRole>()
	.AddEntityFrameworkStores<BaimContext>().AddDefaultTokenProviders();

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(builder =>
	{
		builder.AllowAnyOrigin()
			   .AllowAnyMethod()
			   .AllowAnyHeader();
	});
});


builder.Services.Configure<IdentityOptions>(options =>
{
	// Настройка блокировки
	options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
	options.Lockout.MaxFailedAccessAttempts = 5;

	// Требовать подтверждения по электронной почте
	options.SignIn.RequireConfirmedEmail = true;
});
builder.Services.Configure<DataProtectionTokenProviderOptions>(optionts => optionts.TokenLifespan = TimeSpan.FromHours(10));

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters()
	{
		ValidateActor = true,
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = builder.Configuration["Jwt:Issuer"],
		ValidAudience = builder.Configuration["Jwt:Audience"],
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))

	};
});
var emailConfig = configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>() ?? throw new InvalidOperationException("'Email Configuration' not found.");
builder.Services.AddSingleton(emailConfig);
builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();  
app.UseAuthorization();

app.MapControllers();

app.Run();
