namespace HotelReservationMVP.Server.Core.Models;

public class FacilityCategory
{
    public string Name { get; set; }
    public List<HotelFacility> Facilities { get; set; }
}

