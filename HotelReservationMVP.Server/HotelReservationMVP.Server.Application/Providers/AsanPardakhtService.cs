using HotelReservationMVP.Server.Application.Providers.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace HotelReservationMVP.Server.Application.Providers
{
    public class AsanPardakhtService : IAsanPardakhtService
    {
        private readonly HttpClient _client;
        private readonly string _merchantId;
        private readonly string _password;

        private readonly string _callbackUrl;

        public AsanPardakhtService(IConfiguration config)
        {
            //var baseUrl = config["AsanPardakht:RestUrl"]!;
            var baseUrl = "http://194.41.51.43:81/";
            _merchantId = config["AsanPardakht:MerchantId"]!;
            _password = config["AsanPardakht:Password"]!;
            _callbackUrl = config["AsanPardakht:CallbackUrl"]!;

            _client = new HttpClient
            {
                BaseAddress = new Uri(baseUrl),
                Timeout = TimeSpan.FromSeconds(20)
            };
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _client.DefaultRequestHeaders.Add("usr", _merchantId);
            _client.DefaultRequestHeaders.Add("pwd", _password);
        }

        public async Task<TokenResponse> GetTokenAsync(TokenRequest request)
        {
            request.callbackURL = _callbackUrl;
            request.merchantConfigurationId = int.Parse(_merchantId);

            var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("v1/Token", content);

            var test = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var refId = JsonConvert.DeserializeObject<string>(await response.Content.ReadAsStringAsync());
                return new TokenResponse { RefId = refId, ResCode = 0, ResMessage = "OK" };
            }

            return new TokenResponse { ResCode = (int)response.StatusCode, ResMessage = response.ReasonPhrase };
        }

        public async Task<VerifyResponse> VerifyAsync(VerifyRequest request)
        {
            var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("v1/Verify", content);

            if (response.IsSuccessStatusCode)
            {
                return new VerifyResponse { ResCode = 0, ResMessage = "Verification succeeded" };
            }

            return new VerifyResponse { ResCode = (int)response.StatusCode, ResMessage = response.ReasonPhrase };
        }
        public async Task<VerifyResponse> SettleAsync(VerifyRequest request)
        {
            var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("v1/Settle", content);

            if (response.IsSuccessStatusCode)
            {
                return new VerifyResponse { ResCode = 0, ResMessage = "Settlement succeeded" };
            }

            return new VerifyResponse { ResCode = (int)response.StatusCode, ResMessage = response.ReasonPhrase };
        }

    }
}
