namespace HotelReservationMVP.Server.Core.Models;

public class HotelRoom
{
    public List<AvailabilityModel> Availability { get; set; }
    public List<RoomGalleryModel> Gallery { get; set; }
    public int Id { get; set; }
    public string Name { get; set; }
    public int ExtraCapacity { get; set; }
    public int AdultCapacity { get; set; }
    public string AdultCapacityDescription { get; set; }
    public int InfantCapacity { get; set; }
    public string InfantCapacityDescription { get; set; }
    public string Description { get; set; }
    public string RoomSize { get; set; }
    public string BedSize { get; set; }
    public List<RoomFacilityModel> Facilities { get; set; }
    public List<HotelPriceModel> Prices { get; set; }
    public bool HasEnter { get; set; }
    public bool HasExit { get; set; }
}

