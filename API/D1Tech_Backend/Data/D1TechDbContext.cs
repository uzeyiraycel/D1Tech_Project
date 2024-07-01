using D1Tech_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace D1Tech_Backend.Data
{
    public class D1TechDbContext:DbContext
    {
        public D1TechDbContext(DbContextOptions<D1TechDbContext> options) : base(options) {
            this.ChangeTracker.LazyLoadingEnabled = false;
        }

        public DbSet<TravelPlace> TravelPlaces { get; set; }
        public DbSet<TravelPlaceAddress> TravelPlaceAddresses { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TravelPlace>()
                .HasMany(tp => tp.Addresses)
                .WithOne(a => a.TravelPlace)
                .HasForeignKey(a => a.TravelPlaceId);

            modelBuilder.Entity<TravelPlace>().Property(tp => tp.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<TravelPlaceAddress>().Property(a => a.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<User>().Property(u => u.Id).ValueGeneratedOnAdd();

            base.OnModelCreating(modelBuilder);
        }
    }
}
