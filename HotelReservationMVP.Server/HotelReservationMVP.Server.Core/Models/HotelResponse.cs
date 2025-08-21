namespace HotelReservationMVP.Server.Core.Models;

public record HotelResponseModel
{
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public int TotalItems { get; set; }
    public List<HotelModel> Data { get; set; }
}

