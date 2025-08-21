using HotelReservationMVP.Server.Application.Commands;
using HotelReservationMVP.Server.Application.Services.Booking;
using Microsoft.AspNetCore.Mvc;

namespace HotelReservationMVP.Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        public async Task<IActionResult> PreReserveAsync([FromBody] PreReserveCommand command)
        {
            var result = await _bookingService.PreReserveAsync(command);
            return Ok(result);
        }

        [HttpGet("Pending/{mobile}")]
        public async Task<IActionResult> PendingReserves([FromRoute] string mobile)
        {
            var result = await _bookingService.GetReservesHistoryAsync("Pending", mobile);
            return Ok(result);
        }

        [HttpGet("Completed/{mobile}")]
        public async Task<IActionResult> CompletedReserves([FromRoute] string mobile)
        {
            var result = await _bookingService.GetReservesHistoryAsync("Completed", mobile);
            return Ok(result);
        }

        [HttpGet("Rejected/{mobile}")]
        public async Task<IActionResult> RejectedReserves([FromRoute] string mobile)
        {
            var result = await _bookingService.GetReservesHistoryAsync("Rejected", mobile);
            return Ok(result);
        }

        [HttpPost("FinalizeBook/{reserveId}")]
        public async Task<IActionResult> FinalizeBook([FromRoute] ulong reserveId)
        {
            try
            {
                var result = await _bookingService.FinalizeBookAsync(reserveId);
                return Ok(result);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
