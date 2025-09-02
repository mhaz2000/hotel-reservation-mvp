using HotelReservationMVP.Server.Application.DTOs;

namespace HotelReservationMVP.Server.Application.Services.Payments
{
    public interface IPaymentService
    {
        Task<PaymentStatusDto> GetPaymentStatusAsync(long invoiceId);
        Task<string?> RequestPaymentAsync(ulong reserveId);
        Task VerifyAsync(long invoiceId);
    }
}
