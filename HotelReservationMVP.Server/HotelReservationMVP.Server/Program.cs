using HotelReservationMVP.Server.Application.Providers;
using HotelReservationMVP.Server.Application.Services.Booking;
using HotelReservationMVP.Server.Application.Services.Hotels;
using HotelReservationMVP.Server.Application.Services.Locations;
using HotelReservationMVP.Server.Application.Services.Nations;
using HotelReservationMVP.Server.Application.Services.Payments;
using HotelReservationMVP.Server.Application.Services.Voucher;
using HotelReservationMVP.Server.Core.ExternalServices;
using HotelReservationMVP.Server.Core.Repositories;
using HotelReservationMVP.Server.Infrastructure.Data;
using HotelReservationMVP.Server.Infrastructure.Data.Repositories;
using HotelReservationMVP.Server.Infrastructure.ExternalServices;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<HotelReservationDbContext>(options =>
    options.UseSqlite("Data Source=reservation_hotel.db"));

// Configure the HTTP request pipeline.
builder.Services.AddMemoryCache();

builder.Services.AddHttpClient<IExternalApiClient, ExternalApiClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["IranHotelURL"]!); // your base
    //client.BaseAddress = new Uri("https://www.iranhotelonline.com/api/app/v1/"); // your base
    //client.BaseAddress = new Uri("http://194.41.51.43/api/app/v1/"); // your base
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<IHotelService, HotelService>();
builder.Services.AddScoped<INationService, NationService>();
builder.Services.AddScoped<IVoucherService, VoucherService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IAsanPardakhtService, AsanPardakhtService>();

builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<HotelReservationDbContext>();
    db.Database.Migrate();
}

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
