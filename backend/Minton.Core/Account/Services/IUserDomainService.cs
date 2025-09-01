using Minton.Core.Account.Entities;

namespace Minton.Core.Account.Services
{
    public interface IUserDomainService
    {
        Task<bool> IsEmailUniqueAsync(string email);
        Task<bool> IsUserNameUniqueAsync(string userName);
        Task<User> CreateUserAsync(string firstName, string lastName, string email, string password, string phone, string userName);
        Task<User> UpdateUserProfileAsync(int userId, string firstName, string lastName, string phone, string? image, DateTime? birthday);
        Task<User?> GetUserByIdAsync(int id);
    }
}
