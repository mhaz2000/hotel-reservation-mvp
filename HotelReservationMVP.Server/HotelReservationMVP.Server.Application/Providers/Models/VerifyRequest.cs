namespace HotelReservationMVP.Server.Application.Providers.Models;

public class VerifyRequest
{
    public long payGateTranId { get; set; }
    public long merchantConfigurationId { get; set; }
}
    