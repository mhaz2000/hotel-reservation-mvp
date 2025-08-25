namespace HotelReservationMVP.Server.Core.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public ulong ReserveId { get; set; }
        public string RefId { get; set; }
        public decimal Price { get; set; }

        public DateTime CreatedAt { get; set; }
        public Transaction()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.Now;
        }
    }
}
