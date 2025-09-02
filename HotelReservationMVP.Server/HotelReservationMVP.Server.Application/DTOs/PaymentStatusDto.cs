namespace HotelReservationMVP.Server.Application.DTOs
{
    public record PaymentStatusDto
    {
        public bool IsSuccess { get; set; }
        public decimal? Amount { get; internal set; }
        public string? Rrn { get; internal set; }
    }
}
