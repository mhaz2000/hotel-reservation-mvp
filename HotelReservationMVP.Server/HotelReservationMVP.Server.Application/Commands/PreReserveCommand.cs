using HotelReservationMVP.Server.Application.Converters;
using System.Text.Json.Serialization;

namespace HotelReservationMVP.Server.Application.Commands
{

    public class PreReserveCommand
    {
        public int HotelId { get; set; }
        public string ArrivalDate { get; set; }
        public string CheckoutDate { get; set; }
        public string Email { get; set; } = null!;
        public string? Phone { get; set; }
        public string Mobile { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string FirstName { get; set; } = null!;

        public string HotelImage { get; set; }
        public string HotelAddress { get; set; }
        public string HotelGrade { get; set; }
        public string HotelName { get; set; }

        [JsonConverter(typeof(BoolFromZeroOneConverter))]
        public bool? IsBusinessTravel { get; set; }

        public List<RoomCommand> Rooms { get; set; } = new();
    }

    public class RoomCommand
    {
        public int RoomId { get; set; }
        public string GuestLastName { get; set; } = null!;
        public string GuestFirstName { get; set; } = null!;

        [JsonConverter(typeof(BoolFromZeroOneConverter))]
        public bool Nationality { get; set; } // 0 = Iranian (false), 1 = foreign (true)
        public int? NationId { get; set; }
        public string RoomName { get; set; }
        public decimal RoomPrice { get; set; }
        public string RoomImage { get; set; }
    }
}
