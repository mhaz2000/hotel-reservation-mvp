namespace HotelReservationMVP.Server.Core.Models;

public record StateModel
{
    public int Id { get; set; }
    public string Title { get; set; }
    public ICollection<CityModel> Cities { get; set; }
}
