using HotelReservationMVP.Server.Application.Commands;
using HotelReservationMVP.Server.Application.Services.Payments;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HotelReservationMVP.Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IConfiguration _configuration;

        public PaymentController(IPaymentService paymentService, IConfiguration configuration)
        {
            _paymentService = paymentService;
            _configuration = configuration;
        }

        [HttpPost("request/{reserveId}")]
        public async Task<IActionResult> RequestPayment([FromRoute] ulong reserveId)
        {
            var result = await _paymentService.RequestPaymentAsync(reserveId);

            return string.IsNullOrEmpty(result) ? BadRequest("در فرایند دریافت توکن خطایی پیش آمده است.") : Ok(result);
        }

        [HttpPost("verify/{invoiceId}")]
        public async Task<IActionResult> Verify([FromRoute] long invoiceId)
        {
            await _paymentService.VerifyAsync(invoiceId);
            return Redirect(_configuration["AsanPardakht:ClientCallbackUrl"]! + $"/{invoiceId}");
        }

        [HttpGet("Status/{invoiceId}")]
        public async Task<IActionResult> PaymentStatus(long invoiceId)
        {
            return Ok(await _paymentService.GetPaymentStatusAsync(invoiceId));
        }
    }
}
