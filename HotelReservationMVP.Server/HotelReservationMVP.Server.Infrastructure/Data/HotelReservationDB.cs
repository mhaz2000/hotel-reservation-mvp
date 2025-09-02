using HotelReservationMVP.Server.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace HotelReservationMVP.Server.Infrastructure.Data
{
    public class HotelReservationDbContext : DbContext
    {
        public HotelReservationDbContext(DbContextOptions<HotelReservationDbContext> options) : base(options) { }

        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<ReservingRoom> Rooms { get; set; }
        public DbSet<TransactionDetail> TransactionDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reservation>()
                .HasMany(b => b.Rooms)
                .WithOne(r => r.Reservation)
                .HasForeignKey(r => r.ReservationId);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.TransactionDetail)
                .WithOne()
                .HasForeignKey<Transaction>(t => t.TransactionDetailId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
