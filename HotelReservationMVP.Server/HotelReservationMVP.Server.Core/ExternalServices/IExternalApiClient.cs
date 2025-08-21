using HotelReservationMVP.Server.Core.Models;

namespace HotelReservationMVP.Server.Core.ExternalServices;
public interface IExternalApiClient
{
    Task<ReserveStatusModel> ReserveStatusAsync(ulong reserveId);
    Task<PreReserveModel> PreReserveAsync(PreReserveEntry preReserveEntry);
    Task<IEnumerable<HotelRoom>> GetHotelRoomsAsync(int hotelId, string startDate, string endDate);
    Task<HotelResponseModel> GetHotelsAsync(int cityId, int stateId, string startDate, string endDate, int pageIndex);
    Task<HotelSummaryDto> GetHotelSummaryAsync(int hotelId, string startDate, string endDate);
    Task<List<LocationModel>> GetLocationsAsync();
    Task<List<NationModel>> GetNationsAsync();
    Task<FinalizeBookModel> FinalizeBookAsync(ulong reserveId);
}
