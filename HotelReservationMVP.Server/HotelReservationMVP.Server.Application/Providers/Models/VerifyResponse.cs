namespace HotelReservationMVP.Server.Application.Providers.Models;

public class VerifyResponse
{
    public int ResCode { get; set; }
    public string ResMessage { get; set; }
    public string CardNumber { get; set; }
    public string Rrn { get; set; }
    public string RefId { get; set; }
    public decimal Amount { get; set; }
    public long? PayGateTranID { get; set; }
}