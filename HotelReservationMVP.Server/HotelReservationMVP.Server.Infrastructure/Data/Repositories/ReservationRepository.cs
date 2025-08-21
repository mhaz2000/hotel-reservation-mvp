using HotelReservationMVP.Server.Core.Entities;
using HotelReservationMVP.Server.Core.Repositories;

namespace HotelReservationMVP.Server.Infrastructure.Data.Repositories
{
    public class ReservationRepository : Repository<Reservation>, IReservationRepository
    {
        public ReservationRepository(HotelReservationDbContext context) : base(context)
        {
        }
    }
}
