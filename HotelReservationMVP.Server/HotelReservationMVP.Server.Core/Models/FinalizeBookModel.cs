namespace HotelReservationMVP.Server.Core.Models;

public record FinalizeBookModel
{
    public ulong Id { get; set; }
    public decimal PriceToPay { get; set; }
    public bool IsFinalized { get; set; }
}
