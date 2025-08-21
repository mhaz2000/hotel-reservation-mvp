namespace HotelReservationMVP.Server.Core.Models;

public class HotelSummaryDto
{
    public bool Wifi { get; set; }
    public string WifiDescription { get; set; }
    public bool Parking { get; set; }
    public string ParkingDescription { get; set; }
    public List<Gallery> Gallery { get; set; }
    public string Checkin { get; set; }
    public string Checkout { get; set; }
    public string CancellationPolicy { get; set; }
    public string ChildrenCancellationPolicy { get; set; }
    public string OtherNotes { get; set; }
    public string About { get; set; }
    public Location Location { get; set; }
    public string Restaurant { get; set; }
    public List<FacilityCategory> FacilityCategories { get; set; }
    public List<RateModel> Rates { get; set; }
    public bool FreeWifi { get; set; }
    public bool FreeParking { get; set; }
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

