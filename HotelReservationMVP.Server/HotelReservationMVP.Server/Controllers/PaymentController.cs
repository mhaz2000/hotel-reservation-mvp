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

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("request/{reserveId}")]
        public async Task<IActionResult> RequestPayment([FromRoute] ulong reserveId)
        {
            var result = await _paymentService.RequestPaymentAsync(reserveId);

            return string.IsNullOrEmpty(result) ? BadRequest("در فرایند دریافت توکن خطایی پیش آمده است.") : Ok(result);
        }
    }
}
