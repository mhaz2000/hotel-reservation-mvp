using HotelReservationMVP.Server.Core.Entities;
using HotelReservationMVP.Server.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HotelReservationMVP.Server.Infrastructure.Data.Repositories
{
    public class TransactionRepository : Repository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(HotelReservationDbContext context) : base(context)
        {
        }

        public async Task<long> GetLastLocalIdAsync()
        {
            long id = 1000000;

            var lastId = (await _context.Transactions.OrderBy(c=>c.LocalId).LastOrDefaultAsync())?.LocalId ?? id;

            return lastId + 1;
        }
    }
}
