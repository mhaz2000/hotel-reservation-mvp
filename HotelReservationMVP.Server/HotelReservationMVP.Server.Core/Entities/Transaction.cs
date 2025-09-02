using HotelReservationMVP.Server.Core.Consts;

namespace HotelReservationMVP.Server.Core.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public ulong ReserveId { get; set; }
        public long LocalId { get; set; } //used for Asan Pardakht
        public string RefId { get; set; } = "";
        public decimal Price { get; set; }
        public TransactionStatus Status { get; set; }
        public TransactionDetail? TransactionDetail { get; set; }
        public Guid? TransactionDetailId { get; set; }

        public DateTime CreatedAt { get; set; }
        public Transaction()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.Now;
        }
    }
}
