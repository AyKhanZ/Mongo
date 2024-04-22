﻿using DB.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using DB.Services.Classes;

namespace DB.DbContexts;
public class BaimContext : IdentityDbContext<AspNetUser, IdentityRole, string>
{
	public DbSet<AspNetUser> Users { get; set; }
	public DbSet<Client> Clients { get; set; }
	public DbSet<Employer> Employers { get; set; } 
	public DbSet<Company> Companies { get; set; }
	public DbSet<Partner> Partners { get; set; }
	public DbSet<Mission> Missions { get; set; } 
	public DbSet<Order> Orders { get; set; }
	public DbSet<OrderProduct> OrderProducts { get; set; }
	public DbSet<Product> Products { get; set; } 
	public DbSet<Project> Projects { get; set; }
	public DbSet<UserProject> UserProjects { get; set; }
	public DbSet<UserRole> UserRoles { get; set; }
	public DbSet<Role> Roles { get; set; }
	public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }


	public BaimContext(DbContextOptions<BaimContext> options)
		: base(options) { }

	protected override void OnModelCreating(ModelBuilder builder)
	{
		builder.Entity<AspNetUser>(entity =>
		{
			entity.HasKey(u => u.Id);
			entity.Property(u => u.Id1C);
			entity.Property(u => u.Age);
			entity.Property(u => u.Gender);
			entity.Property(u => u.Patronimic);
			entity.Property(u => u.BirthDate);
			entity.Property(u => u.LastName);
			entity.Property(u => u.Image); 
			entity.Property(u => u.TaskState);
			entity.Property(u => u.PhoneNumber);
			entity.Property(u => u.Role).HasDefaultValue("Client");

			entity.HasIndex(u => u.PhoneNumber).IsUnique();

			entity.HasOne(u => u.Client)
				.WithOne(c => c.User)
				.HasForeignKey<Client>(c => c.UserId)
				.OnDelete(DeleteBehavior.Restrict);

			entity.HasOne(u => u.Employer)
				.WithOne(e => e.User)
				.HasForeignKey<Employer>(e => e.UserId)
				.OnDelete(DeleteBehavior.Restrict);
		});

		builder.Entity<Client>(entity =>
		{
			entity.HasKey(op => op.Id);
			entity.Property(op => op.Id).ValueGeneratedOnAdd();
			entity.Property(с => с.BusinessPhoneNumber);
			entity.Property(с => с.PersonalEmail);
			entity.Property(с => с.IsDirector).HasDefaultValue(false);
			entity.Property(с => с.IsPublic).HasDefaultValue(false);
			entity.Property(с => с.ClientFeedback);
			entity.Property(с => с.ClientConfirm);
			entity.Property(с => с.YoutubeLink);

			entity.HasOne(c => c.Company)
			  .WithOne(c => c.Director)
			  .HasForeignKey<Client>(c => c.CompanyId);
		});

		builder.Entity<Company>(entity =>
		{
			entity.HasKey(op => op.Id);
			entity.Property(op => op.Id).ValueGeneratedOnAdd();
			entity.Property(с => с.Id1C);
			entity.Property(с => с.TypeOfActivity);
			entity.Property(с => с.Name).IsRequired();
			entity.Property(с => с.VOEN).IsRequired(); 
			entity.Property(o => o.Description);
			entity.Property(p => p.Image).IsRequired();
			entity.Property(p => p.ImageType).HasDefaultValue("data:image/png;base64,");
			entity.Property(o => o.StartDate);
			entity.Property(с => с.Address);

			entity.HasIndex(u => u.Name).IsUnique();
		});

		builder.Entity<Partner>(entity =>
		{
			entity.HasKey(op => op.Id);
			entity.Property(op => op.Id).ValueGeneratedOnAdd();
			entity.Property(с => с.Id1C);
			entity.Property(с => с.TypeOfActivity);
			entity.Property(с => с.Name).IsRequired();
			entity.Property(o => o.Description);
			entity.Property(p => p.Image).IsRequired();
			entity.Property(p => p.ImageType).HasDefaultValue("data:image/png;base64,");

			entity.HasIndex(u => u.Name).IsUnique();
		});

		builder.Entity<Employer>(entity =>
		{
			entity.HasKey(op => op.Id);
			entity.Property(op => op.Id).ValueGeneratedOnAdd();
			entity.Property(e => e.IsDismissed).HasDefaultValue(false);
			entity.Property(e => e.Position).IsRequired().HasMaxLength(50);
			entity.Property(e => e.Experience).IsRequired();
			entity.Property(e => e.Certificates);
		});

		builder.Entity<Product>(entity =>
		{
			entity.HasKey(p => p.Id);
			entity.Property(p => p.Id).ValueGeneratedOnAdd();
			entity.Property(p => p.Id1C).IsRequired()
				.HasAnnotation("ErrorMessage", "The Id 1C field is required!"); ;
			entity.Property(p => p.Name).IsRequired()
				.HasAnnotation("ErrorMessage", "The Name field is required.");
			entity.Property(p => p.Description);
			entity.Property(p => p.IsPublic).HasDefaultValue(false);
			entity.Property(p => p.ProductType).IsRequired()
				.HasAnnotation("ErrorMessage", "The ProductType field is required!");
			entity.Property(p => p.Image).IsRequired();
			entity.Property(p => p.ImageType).HasDefaultValue("data:image/png;base64,");

			entity.HasIndex(p => p.Id1C).IsUnique();
		});

		builder.Entity<Order>(entity =>
		{
			entity.HasKey(o => o.Id);
			entity.Property(o => o.Id).ValueGeneratedOnAdd();
			entity.Property(o => o.StartDate);
			entity.Property(o => o.DoneDate);
			entity.Property(o => o.TotalPrice);
			entity.Property(o => o.PaymentMethod);
			entity.Property(o => o.DoneState);

			entity.Property(o => o.TotalPrice).IsRequired();

			entity.HasOne(o => o.User)
				.WithMany(u => u.Orders)
				.HasForeignKey(o => o.UserId)
				.OnDelete(DeleteBehavior.Restrict);
		});

		builder.Entity<OrderProduct>(entity =>
		{
			entity.HasKey(op => op.Id);
			entity.Property(op => op.Id).ValueGeneratedOnAdd();

			entity.HasOne(op => op.Order)
				.WithMany(o => o.OrderProducts)
				.HasForeignKey(op => op.OrderId)
				.OnDelete(DeleteBehavior.Restrict);

			entity.HasOne(o => o.Product)
				.WithMany(p => p.OrderProducts)
				.HasForeignKey(o => o.ProductId)
				.OnDelete(DeleteBehavior.Restrict);
		});

		builder.Entity<Mission>(entity =>
		{
			entity.HasKey(m => m.Id);
			entity.Property(m => m.Id).ValueGeneratedOnAdd();
			entity.Property(m => m.Title).IsRequired().HasMaxLength(100);
			entity.Property(m => m.IsVeryImportant).HasDefaultValue(false);
			entity.Property(m => m.Description);
			entity.Property(m => m.IsExpired).HasDefaultValue(false);
			entity.Property(m => m.StartDate);
			entity.Property(m => m.DeadLine);

			entity.HasOne(m => m.Project)
				.WithMany(m => m.Missions)
				.HasForeignKey(m => m.ProjectId)
				.OnDelete(DeleteBehavior.Restrict);
		});

		builder.Entity<Project>(entity =>
		{
			entity.HasKey(p => p.Id);
			entity.Property(p => p.Id).ValueGeneratedOnAdd();
			entity.Property(p => p.Name).IsRequired().HasMaxLength(100);
			entity.Property(p => p.Description);
			entity.Property(p => p.DesignTheme);
			entity.Property(p => p.Avatar);

			entity.HasOne(p=>p.Company)
			.WithMany(m => m.Projects)
			.HasForeignKey(m => m.CompanyId)
			.OnDelete(DeleteBehavior.Restrict);
		});

		builder.Entity<UserProject>(entity =>
		{
			entity.HasKey(up => up.Id);
			entity.Property(up => up.Id).ValueGeneratedOnAdd();


			entity.HasOne(up => up.User)
				.WithMany(up => up.UserProjects)
				.HasForeignKey(up => up.UserId)
				.OnDelete(DeleteBehavior.Restrict);

			entity.HasOne(up => up.Project)
				.WithMany(up => up.UserProjects)
				.HasForeignKey(up => up.ProjectId)
				.OnDelete(DeleteBehavior.Restrict);
		});

		builder.Entity<UserRole>(entity =>
		{
			entity.HasKey(ur => ur.Id);
			entity.Property(ur => ur.Id).ValueGeneratedOnAdd();

			entity.HasOne(ur => ur.User)
				.WithMany(ur => ur.UserRoles)
				.HasForeignKey(ur => ur.UserId)
				.OnDelete(DeleteBehavior.Restrict);

			entity.HasOne(ur => ur.Mission)
				.WithMany(ur => ur.UserRoles)
				.HasForeignKey(ur => ur.MissionId)
				.OnDelete(DeleteBehavior.Restrict);
		});
		builder.Entity<Role>(entity =>
		{
			entity.HasKey(r => r.Id);
			entity.Property(r => r.Id).ValueGeneratedOnAdd();
			entity.Property(u => u.RoleName);
			entity.HasData(
				new Role() {Id = 1, RoleName = "Observer" },
				new Role() { Id = 2, RoleName = "Executor" },
				new Role() { Id = 3, RoleName = "Director" }
			);
		});

		base.OnModelCreating(builder);
		//Add roles 
		RoleSeed.SeedRoles(builder);
	} 
}