using HotelReservationMVP.Server.Core.Entities;
using HotelReservationMVP.Server.Core.Repositories;

namespace HotelReservationMVP.Server.Infrastructure.Data.Repositories
{
    public class TransactionDetailRepository : Repository<TransactionDetail>, ITransactionDetailRepository
    {
        public TransactionDetailRepository(HotelReservationDbContext context) : base(context)
        {
        }
    }
}
