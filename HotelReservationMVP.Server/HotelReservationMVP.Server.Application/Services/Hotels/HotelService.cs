using HotelReservationMVP.Server.Core.ExternalServices;
using HotelReservationMVP.Server.Core.Models;

namespace HotelReservationMVP.Server.Application.Services.Hotels
{
    public class HotelService : IHotelService
    {
        private readonly IExternalApiClient _externalApiClient;

        public HotelService(IExternalApiClient externalApiClient)
        {
            _externalApiClient = externalApiClient;
        }

        public async Task<HotelResponseModel> GetHotelsAsync(int cityId, int stateId, string startDate, string endDate, int pageIndex)
        {
            return await _externalApiClient.GetHotelsAsync(cityId, stateId, startDate, endDate, pageIndex);
        }


        public async Task<HotelSummaryDto> GetHotelInfoAsync(int hotelId, string startDate, string endDate)
        {
            return await _externalApiClient.GetHotelSummaryAsync(hotelId, startDate, endDate);

        }

        public async Task<IEnumerable<HotelRoom>> GetHotelRoomsAsync(int hotelId, string startDate, string endDate)
        {
            return await _externalApiClient.GetHotelRoomsAsync(hotelId, startDate, endDate);

        }
    }
}
