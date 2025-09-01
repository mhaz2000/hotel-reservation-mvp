using HotelReservationMVP.Server.Application.DTOs;

namespace HotelReservationMVP.Server.Application.Services.Payments
{
    public interface IPaymentService
    {
        Task<PaymentStatusDto> GetPaymentStatusAsync();
        Task<string?> RequestPaymentAsync(ulong reserveId);
        Task<string> VerifyAsync(long payGateTranId, string refId);
    }
}
