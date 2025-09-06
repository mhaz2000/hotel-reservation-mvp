using HotelReservationMVP.Server.Application.Providers.Models;

namespace HotelReservationMVP.Server.Application.Providers
{
    public interface IAsanPardakhtService
    {
        Task<TokenResponse> GetTokenAsync(TokenRequest request);
        Task<VerifyResponse> TransactionResultAsync(long invoiceId);
        //Task<VerifyResponse> SettleAsync(VerifyRequest request);
        Task<VerifyResponse> VerifyAsync(VerifyRequest request);
    }
}
