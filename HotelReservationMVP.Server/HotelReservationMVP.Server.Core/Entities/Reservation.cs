using HotelReservationMVP.Server.Core.Consts;

namespace HotelReservationMVP.Server.Core.Entities
{
    public class Reservation
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int HotelId { get; set; }
        public string ArrivalDate { get; set; }
        public string CheckoutDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public bool IsBusinessTravel { get; set; }
        public string HotelImage { get; set; }
        public string HotelAddress { get; set; }
        public string HotelGrade { get; set; }
        public string HotelName { get; set; }
        public ulong ReserveId { get; set; }
        public ReservationStatus Status { get; set; }
        public ICollection<ReservingRoom> Rooms { get; set; } = [];
        public ulong? PaymentExpireSeconds { get; set; }

        public Reservation()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.Now;
        }
    }
}
