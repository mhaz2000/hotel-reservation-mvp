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

        [HttpPost("verify")]
        public async Task<IActionResult> Verify([FromForm] object command)
        {
            //var formValues = Request.Form
            //        .ToDictionary(k => k.Key, v => v.Value.ToString());

            //// Convert dictionary to lines
            //var lines = formValues.Select(kvp => $"{kvp.Key}={kvp.Value}");

            //// Define the file path (adjust path as needed)
            //var filePath = Path.Combine(Directory.GetCurrentDirectory(), "callback_log.txt");

            //// Ensure directory exists (if you want to save in a subfolder)
            //// Directory.CreateDirectory(Path.GetDirectoryName(filePath));

            //// Append lines to file (creates file if it doesn't exist)
            //await System.IO.File.AppendAllLinesAsync(filePath, lines);

            //string result = await _paymentService.VerifyAsync(command.PayGateTranId, command.RefId);
            return Redirect(_configuration["AsanPardakht:ClientCallbackUrl"]!);
        }

        [HttpGet("Status")]
        public async Task<IActionResult> PaymentStatus()
        {
            return Ok(await _paymentService.GetPaymentStatusAsync());
        }
    }
}
