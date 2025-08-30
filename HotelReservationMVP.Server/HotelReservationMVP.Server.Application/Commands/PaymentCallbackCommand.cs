namespace HotelReservationMVP.Server.Application.Commands
{
    public record PaymentCallbackCommand
    {
        public long PayGateTranId { get; set; }
        public string RefId { get; set; }
    }
}
