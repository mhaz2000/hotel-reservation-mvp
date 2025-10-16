using HotelReservationMVP.Server.Core.Consts;

namespace HotelReservationMVP.Server.Application.DTOs
{
    public record ReservesHistoryDto
    {
        public string HotelName { get; set; } = string.Empty;
        public string HotelGrade { get; set; } = string.Empty;
        public string HotelImage { get; set; } = string.Empty;
        public string HotelAddress { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ReserveDate { get; set; } = string.Empty;

        public string StatusText { get; internal set; } = string.Empty;
        public ulong? PaymentExpiredIn { get; internal set; }
        public ICollection<ReserveHistoryRoomDto> Rooms { get; set; }
        public ulong ReserveId { get; internal set; }
        public decimal TotalAmount { get; set; } = default;
    }
}
