using HotelReservationMVP.Server.Core.Entities;

namespace HotelReservationMVP.Server.Core.Repositories
{
    public interface ITransactionRepository : IRepository<Transaction>
    {
        Task<long> GetLastLocalIdAsync();
    }
}
