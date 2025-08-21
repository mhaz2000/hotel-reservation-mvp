namespace HotelReservationMVP.Server.Core.Entities
{
    public class ReservingRoom
    {
        public Guid Id { get; set; }
        public int RoomId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int NationId { get; set; }
        public bool Nationality { get; set; }

        public Reservation Reservation { get; set; }
        public Guid ReservationId { get; set; }
        public decimal RoomPrice { get; set; }
        public string RoomName { get; set; }
        public string RoomImage { get; set; }

        public ReservingRoom()
        {
            Id = Guid.NewGuid();
        }
    }
}
