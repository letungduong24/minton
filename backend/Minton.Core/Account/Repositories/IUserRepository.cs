using Minton.Core.Account.Entities;
using Minton.Core.Shared;

namespace Minton.Core.Account.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByUserNameAsync(string userName);
        Task<bool> ExistsByEmailAsync(string email);
        Task<bool> ExistsByUserNameAsync(string userName);
        Task<IEnumerable<User>> GetActiveUsersAsync();
    }
}
