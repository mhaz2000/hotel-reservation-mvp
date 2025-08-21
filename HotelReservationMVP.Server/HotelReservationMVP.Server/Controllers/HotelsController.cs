using HotelReservationMVP.Server.Application.Commands;
using HotelReservationMVP.Server.Application.Services.Hotels;
using Microsoft.AspNetCore.Mvc;

namespace HotelReservationMVP.Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly IHotelService _hotelService;

        public HotelsController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        [HttpPost]
        public async Task<IActionResult> SearchHotels([FromBody] SearchHotelCommand command)
        {
            return Ok(await _hotelService.GetHotelsAsync(command.CityId, command.StateId, command.StartDate, command.EndDate, command.PageIndex));
        }

        [HttpGet("{hotelId}")]
        public async Task<IActionResult> GetHotelInfo([FromRoute] int hotelId, [FromQuery] string startDate, string endDate)
        {
            return Ok(await _hotelService.GetHotelInfoAsync(hotelId, startDate, endDate));
        }

        [HttpGet("{hotelId}/GetRooms")]
        public async Task<IActionResult> GetHotelRooms([FromRoute] int hotelId, [FromQuery] string startDate, string endDate)
        {
            return Ok(await _hotelService.GetHotelRoomsAsync(hotelId, startDate, endDate));
        }
    }
}
