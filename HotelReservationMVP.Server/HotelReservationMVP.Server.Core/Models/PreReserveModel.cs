namespace HotelReservationMVP.Server.Core.Models;

public record PreReserveModel
{
    public ulong ReserveId { get; set; }
    public int StateId {get; set;}
    public string StatusText {get; set;}
    public DateTime? PaymentExpireDate {get; set;}
    public ulong PaymentExpireSeconds {get; set;}
    public decimal? ProviderChangePrice {get; set;}
}
