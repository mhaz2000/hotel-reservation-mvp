namespace HotelReservationMVP.Server.Application.DTOs
{
    public record ReserveHistoryRoomDto
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Image { get; internal set; }
    }
}
