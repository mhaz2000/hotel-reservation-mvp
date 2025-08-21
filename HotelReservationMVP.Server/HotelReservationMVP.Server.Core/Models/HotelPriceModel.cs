namespace HotelReservationMVP.Server.Core.Models;

public class HotelPriceModel
{
    public List<NightModel> Nights { get; set; }
    public List<object> Promotions { get; set; }
    public bool NonRefundable { get; set; }
}

