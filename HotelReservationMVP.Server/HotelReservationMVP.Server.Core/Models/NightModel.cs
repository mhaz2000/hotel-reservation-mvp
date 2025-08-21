namespace HotelReservationMVP.Server.Core.Models;

public class NightModel
{
    public string CurrentDate { get; set; }
    public int BoardPrice { get; set; }
    public int BoardPriceEn { get; set; }
    public int IhoPrice { get; set; }
    public int RawIhoPrice { get; set; }
    public double IhoPriceEn { get; set; }
    public int MinSalePrice { get; set; }
    public int CommissionPrice { get; set; }
    public int ExtraBoardPrice { get; set; }
    public int ExtraIhoPrice { get; set; }
    public bool BreakFast { get; set; }
    public bool Lunch { get; set; }
    public bool Dinner { get; set; }
}

