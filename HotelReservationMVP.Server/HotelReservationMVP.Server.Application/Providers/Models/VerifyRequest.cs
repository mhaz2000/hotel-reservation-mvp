namespace HotelReservationMVP.Server.Application.Providers.Models;

public class VerifyRequest
{
    public string RefId { get; set; }
    public long LocalInvoiceId { get; set; }
}
