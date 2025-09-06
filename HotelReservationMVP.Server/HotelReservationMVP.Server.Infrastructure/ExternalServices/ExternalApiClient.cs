using HotelReservationMVP.Server.Core.ExternalServices;
using HotelReservationMVP.Server.Core.Models;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace HotelReservationMVP.Server.Infrastructure.ExternalServices;

public class ExternalApiClient : IExternalApiClient
{
    private readonly HttpClient _httpClient;
    public ExternalApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;

        _httpClient.DefaultRequestHeaders.Authorization =
           new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MDM1OTYiLCJGY21JZCI6IjAiLCJBcHBsaWNhdGlvblRva2VuSWQiOiIyOSIsIkFwcGxpY2F0aW9uSWQiOiIyOSIsIklzVGVzdCI6IkZhbHNlIiwiSXNJaG9DbGllbnQiOiJGYWxzZSIsIkV4cGlyZVRpbWUiOiI0LzYvMjAyNiAxMDoxNjo1MyBBTSIsInJvbGUiOiJBZ2VuY2llcyIsIm5iZiI6MTc0MzkyMjM4OCwiZXhwIjoxNzc2MDYyODEzLCJpYXQiOjE3NDM5MjIzODh9.PusbLr9xR3FCfVzQoaRbN4otGeP8uHTWaReSx81fY2g");

    }

    public async Task<IEnumerable<HotelRoom>> GetHotelRoomsAsync(int hotelId, string startDate, string endDate)
    {
        var response = await _httpClient.GetAsync($"hotel/{hotelId}/GetRooms?startDate={startDate}&endDate={endDate}");
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync();
        var rooms = JsonSerializer.Deserialize<IEnumerable<HotelRoom>>(responseJson, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return rooms!;
    }

    public async Task<HotelResponseModel> GetHotelsAsync(int cityId, int stateId, string startDate, string endDate, int pageIndex)
    {
        var body = new
        {
            cityId,
            stateId,
            startDate,
            endDate,
            pageIndex,
            pageSize = 10
        };

        var json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        // Post request
        var response = await _httpClient.PostAsync("hotel/externalSearch", content);

        response.EnsureSuccessStatusCode();

        // Read and deserialize response
        var responseJson = await response.Content.ReadAsStringAsync();
        var hotels = JsonSerializer.Deserialize<HotelResponseModel>(responseJson, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return hotels!;
    }

    public async Task<PreReserveModel> PreReserveAsync(PreReserveEntry preReserveEntry)
    {
        var json = JsonSerializer.Serialize(preReserveEntry);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        // Post request
        var response = await _httpClient.PostAsync("booking/Reserve", content);
        var responseJson = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            if (responseJson == "Book_Hourly_Room_Is_Illegal_For_More_Than_One_Day")
                throw new ApplicationException("رزروِ اتاق ساعتی، برای بیش از یک روز امکان پذیر نیست.");

            throw new ApplicationException(responseJson);
        }
        // Read and deserialize response
        var preReserve = JsonSerializer.Deserialize<PreReserveModel>(responseJson, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return preReserve!;
    }

    public async Task<HotelSummaryDto> GetHotelSummaryAsync(int hotelId, string startDate, string endDate)
    {
        var response = await _httpClient.GetAsync($"hotel/{hotelId}?startDate={startDate}&endDate={endDate}");
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<HotelSummaryDto>();
    }

    public async Task<List<LocationModel>> GetLocationsAsync()
    {
        var response = await _httpClient.GetAsync("utilities/states");
        response.EnsureSuccessStatusCode();

        var states = await response.Content.ReadFromJsonAsync<IEnumerable<StateModel>>()
               ?? Enumerable.Empty<StateModel>();

        var locations = states.SelectMany(state =>
            state.Cities.Select(city => new LocationModel
            {
                State = state.Title,
                StateId = state.Id.ToString(),
                City = city.Title,
                CityId = city.Id.ToString()
            })
        );

        return locations.ToList();
    }

    public async Task<List<NationModel>> GetNationsAsync()
    {
        var response = await _httpClient.GetAsync("utilities/nationalities");
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<List<NationModel>>();
    }

    public async Task<ReserveStatusModel> ReserveStatusAsync(ulong reserveId)
    {
        var response = await _httpClient.GetAsync($"booking/ReserveDetail/{reserveId}/true");
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<ReserveStatusModel>();
    }

    public async Task<FinalizeBookModel> FinalizeBookAsync(ulong reserveId)
    {
        try
        {
            var response = await _httpClient.PostAsync($"payment/Book/{reserveId}", null);
            if (response.IsSuccessStatusCode)
                return await response.Content.ReadFromJsonAsync<FinalizeBookModel>();
            else
                return new FinalizeBookModel
                {
                    Id = reserveId,
                    IsFinalized = false,
                    PriceToPay = 0,
                };
        }
        catch (Exception e)
        {
            return new FinalizeBookModel
            {
                Id = reserveId,
                IsFinalized = false,
                PriceToPay = 0,
            };
        }
    }
}
