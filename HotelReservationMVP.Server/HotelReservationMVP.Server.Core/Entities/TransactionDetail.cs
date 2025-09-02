namespace HotelReservationMVP.Server.Core.Entities
{
    public class TransactionDetail
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public string? CardNumber { get; set; }
        public string? Rrn { get; set; }
        public string? RefId { get; set; }
        public decimal? Amount { get; set; }
        public long? PayGateTranID { get; set; }
        public int ResCode { get; set; }
        public string ResMessage { get; set; } = "";

        public TransactionDetail()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.Now;
        }
    }
}
