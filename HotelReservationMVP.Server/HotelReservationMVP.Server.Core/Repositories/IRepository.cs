using System.Linq.Expressions;

namespace HotelReservationMVP.Server.Core.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task AddAsync(T entity);
        Task DeleteAsync(Guid id);
        Task<T?> GetAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IQueryable<T>>? include = null);
        IQueryable<T> GetMany(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IQueryable<T>>? include = null);
        Task UpdateAsync(T entity);
        Task CommitAsync();
    }
}
