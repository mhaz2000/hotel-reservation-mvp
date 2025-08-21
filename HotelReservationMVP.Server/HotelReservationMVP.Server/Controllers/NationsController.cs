using HotelReservationMVP.Server.Application.Services.Nations;
using Microsoft.AspNetCore.Mvc;

namespace HotelReservationMVP.Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NationsController : ControllerBase
    {
        private readonly INationService _nationService;

        public NationsController(INationService nationService)
        {
            _nationService = nationService;
        }

        [HttpGet]
        public async Task<IActionResult> Get() 
        { 
            return Ok(await _nationService.GetNationsAsync());
        }

    }
}
