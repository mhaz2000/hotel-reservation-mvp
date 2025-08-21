namespace HotelReservationMVP.Server.Core.Models;

public record ReserveStatusModel
{
    public string Title { get; set; }
    public int StateId { get; set; }
    public bool IsFinalized { get; set; }
    public ulong? PaymentExpireSeconds { get; set; }
}