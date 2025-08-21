using HotelReservationMVP.Server.Core.Consts;

namespace HotelReservationMVP.Server.Application.DTOs
{
    public record ReservesHistoryDto
    {
        public string HotelName { get; set; }
        public string HotelGrade { get; set; }
        public string HotelImage { get; set; }
        public string HotelAddress { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Status { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ReserveDate { get; set; }

        public string StatusText { get; internal set; }
        public ulong? PaymentExpiredIn { get; internal set; }
        public ICollection<ReserveHistoryRoomDto> Rooms { get; set; }
        public ulong ReserveId { get; internal set; }
    }
}
