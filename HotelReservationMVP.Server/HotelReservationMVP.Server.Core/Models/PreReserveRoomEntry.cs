namespace HotelReservationMVP.Server.Core.Models;

public record PreReserveRoomEntry
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int NationId { get; set; }
    public bool Nationality { get; set; }
}