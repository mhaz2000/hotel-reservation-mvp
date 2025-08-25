using HotelReservationMVP.Server.Core.Entities;
using HotelReservationMVP.Server.Core.Repositories;

namespace HotelReservationMVP.Server.Infrastructure.Data.Repositories
{
    public class TransactionRepository : Repository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(HotelReservationDbContext context) : base(context)
        {
        }
    }
}
