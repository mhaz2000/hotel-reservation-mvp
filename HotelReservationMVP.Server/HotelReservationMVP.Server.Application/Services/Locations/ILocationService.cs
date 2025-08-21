using HotelReservationMVP.Server.Core.Models;

namespace HotelReservationMVP.Server.Application.Services.Locations
{
    public interface ILocationService
    {
        Task<IEnumerable<LocationModel>> GetLocationsAsync(string? search);
    }
}
