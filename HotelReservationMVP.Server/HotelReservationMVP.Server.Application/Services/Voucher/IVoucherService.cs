using HotelReservationMVP.Server.Core.Entities;

namespace HotelReservationMVP.Server.Application.Services.Voucher;
public interface IVoucherService
{
    MemoryStream GetVoucher(Reservation reservation);
}
