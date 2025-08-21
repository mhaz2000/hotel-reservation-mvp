using HotelReservationMVP.Server.Application.Services.Locations;
using Microsoft.AspNetCore.Mvc;

namespace HotelReservationMVP.Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationsController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocations(string? search) 
        { 
            return Ok(await _locationService.GetLocationsAsync(search));
        }

    }
}
