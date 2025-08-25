using HotelReservationMVP.Server.Application.Providers.Models;

namespace HotelReservationMVP.Server.Application.Providers
{
    public interface IAsanPardakhtService
    {
        Task<TokenResponse> GetTokenAsync(TokenRequest request);
        Task<VerifyResponse> VerifyAsync(VerifyRequest request);
        Task<VerifyResponse> SettleAsync(VerifyRequest request);
    }
}
