using HotelReservationMVP.Server.Core.Models;

namespace HotelReservationMVP.Server.Application.Services.Nations
{
    public interface INationService
    {
        Task<IEnumerable<NationModel>> GetNationsAsync();
    }
}
