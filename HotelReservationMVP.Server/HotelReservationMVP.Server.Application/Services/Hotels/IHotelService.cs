using HotelReservationMVP.Server.Core.Models;

namespace HotelReservationMVP.Server.Application.Services.Hotels
{

    public interface IHotelService
    {
        Task<HotelResponseModel> GetHotelsAsync(int cityId, int stateId, string startDate, string endDate, int pageIndex);
        Task<HotelSummaryDto> GetHotelInfoAsync(int hotelId, string startDate, string endDate);
        Task<IEnumerable<HotelRoom>> GetHotelRoomsAsync(int hotelId, string startDate, string endDate);
    }
}
