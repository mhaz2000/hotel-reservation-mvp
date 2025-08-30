namespace HotelReservationMVP.Server.Application.Providers.Models;

public class TokenRequest
{
    public long localInvoiceId { get; set; }
    public ulong amountInRials { get; set; }
    public string callbackURL { get; set; }
    public int serviceTypeId { get; set; } = 1;
    public string localDate { get { return DateTime.Now.ToString("yyyyMMdd HHmmss"); } }

    public int merchantConfigurationId { get; set; }
}
