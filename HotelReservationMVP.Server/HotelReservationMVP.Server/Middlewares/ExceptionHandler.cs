using System.Net;
using System.Text.Json;

namespace HotelReservationMVP.Server.API.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context); // Call the next middleware
            }
            catch (ApplicationException ex)
            {
                _logger.LogError(ex, "Application exception occurred");

                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "application/json";

                var response = new
                {
                    message = ex.Message,
                };

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                await context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred");

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var response = new
                {
                    message = "An unexpected error occurred.",
                    detail = ex.Message, // ⚠️ Consider hiding this in production
                    path = context.Request.Path,
                    traceId = context.TraceIdentifier
                };

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                await context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
            }
        }
    }
}
