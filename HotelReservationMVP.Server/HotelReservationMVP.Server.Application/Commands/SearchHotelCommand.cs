namespace HotelReservationMVP.Server.Application.Commands
{
    public record SearchHotelCommand
    {
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int CityId { get; set; }
        public int StateId { get; set; }
        public int PageIndex { get; set; }
    }
}
