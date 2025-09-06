using HotelReservationMVP.Server.Core.Entities;
using HotelReservationMVP.Server.Core.Repositories;

namespace HotelReservationMVP.Server.Infrastructure.Data.Repositories
{
    public class LogRepository : Repository<Log>, ILogRepository
    {
        public LogRepository(HotelReservationDbContext context) : base(context)
        {
        }
    }
}
