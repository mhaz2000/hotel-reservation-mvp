namespace HotelReservationMVP.Server.Core.Models;

public record HotelModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string HotelRank { get; set; }
    public string Address { get; set; }
    public string RankName { get; set; }
    public string GradeName { get; set; }
    public double BoardPrice { get; set; }
    public double IhoPrice { get; set; }
    public double IhoPriceEn { get; set; }
    public double BoardPriceEn { get; set; }
    public double RawIhoPrice { get; set; }
    public bool HasFreeTransfer { get; set; }
    public string FullName { get; set; }
    public bool FullCapacity { get; set; }
}

