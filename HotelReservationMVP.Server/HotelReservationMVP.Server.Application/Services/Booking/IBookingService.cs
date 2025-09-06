using HotelReservationMVP.Server.Application.Commands;
using HotelReservationMVP.Server.Application.DTOs;
using HotelReservationMVP.Server.Core.Models;

namespace HotelReservationMVP.Server.Application.Services.Booking
{
    public interface IBookingService
    {
        Task<MemoryStream> DownloadVoucherAsync(ulong reserveId);
        Task<IEnumerable<ReservesHistoryDto>> GetReservesHistoryAsync(string type, string mobile);
        Task<PreReserveModel> PreReserveAsync(PreReserveCommand command);
    }
}
