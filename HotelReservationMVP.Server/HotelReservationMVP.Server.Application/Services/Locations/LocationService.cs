using HotelReservationMVP.Server.Core.ExternalServices;
using HotelReservationMVP.Server.Core.Models;
using Microsoft.Extensions.Caching.Memory;

namespace HotelReservationMVP.Server.Application.Services.Locations
{
    public class LocationService : ILocationService
    {
        private readonly IMemoryCache _cache;
        private readonly IExternalApiClient _externalApiClient;
        private const string CacheKey = "Locations";

        public LocationService(IMemoryCache cache, IExternalApiClient externalApiClient)
        {
            _externalApiClient = externalApiClient;
            _cache = cache;
        }
        public async Task<IEnumerable<LocationModel>> GetLocationsAsync(string? search)
        {
            if (!_cache.TryGetValue(CacheKey, out List<LocationModel> locations)
            || locations is null || !locations.Any())
            {

                locations = await _externalApiClient.GetLocationsAsync();

                _cache.Set(CacheKey, locations, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(300),
                    SlidingExpiration = TimeSpan.FromMinutes(5)
                });
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.ToLower();
                locations = locations
                    .Where(l => l.State.ToLower().Contains(term) || l.City.ToLower().Contains(term))
                    .ToList();
            }

            return locations;
        }
    }
}
