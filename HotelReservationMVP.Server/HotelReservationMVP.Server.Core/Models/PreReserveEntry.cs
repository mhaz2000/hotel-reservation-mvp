namespace HotelReservationMVP.Server.Core.Models;

public record PreReserveEntry
{
    public int HotelId { get; set; }
    public string ArrivalDate { get; set; }
    public string CheckoutDate { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Mobile { get; set; }
    public string Phone { get; set; }
    public bool IsBusinessTravel { get; set; }
    public List<PreReserveRoomEntry> Rooms { get; set; }
}
