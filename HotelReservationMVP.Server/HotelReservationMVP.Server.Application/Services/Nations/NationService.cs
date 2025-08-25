using HotelReservationMVP.Server.Core.ExternalServices;
using HotelReservationMVP.Server.Core.Models;
using Microsoft.Extensions.Caching.Memory;

namespace HotelReservationMVP.Server.Application.Services.Nations
{
    public class NationService : INationService
    {
        private readonly IMemoryCache _cache;
        private readonly IExternalApiClient _externalApiClient;
        private const string CacheKey = "Nations";

        public NationService(IMemoryCache cache, IExternalApiClient externalApiClient)
        {
            _cache = cache;
            _externalApiClient = externalApiClient; 
        }
        public async Task<IEnumerable<NationModel>> GetNationsAsync()
        {
            if (!_cache.TryGetValue(CacheKey, out List<NationModel> nations)
           || nations is null || !nations.Any())
            {

                nations = await _externalApiClient.GetNationsAsync();

                _cache.Set(CacheKey, nations, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(300),
                    SlidingExpiration = TimeSpan.FromMinutes(5)
                });
            }

            return nations;
        }
    }
}
