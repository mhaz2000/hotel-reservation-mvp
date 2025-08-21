namespace HotelReservationMVP.Server.Core.Models;

public record LocationModel
{
    public string City { get; set; }
    public string State { get; set; }
    public string StateId { get; set; }
    public string CityId { get; set; }
}

