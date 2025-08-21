namespace HotelReservationMVP.Server.Core.Models;

public class AvailabilityModel
{
    public DateTime currentDate { get; set; }
    public bool full { get; set; }
    public bool blocked { get; set; }
    public bool hasNoEnter { get; set; }
    public bool hasNoExit { get; set; }
    public bool closed { get; set; }
    public bool isPackage { get; set; }
    public int freeCapacity { get; set; }
    public int roomId { get; set; }
}

