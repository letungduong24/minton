using Minton.Application.Helpers;
using Minton.Core.Account.Entities;
using Minton.Core.Account.Repositories;
using Minton.Core.Account.Services;

namespace Minton.Infrastructure.Account.Services
{
    public class UserDomainService : IUserDomainService
    {
        private readonly IUserRepository _userRepository;

        public UserDomainService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> IsEmailUniqueAsync(string email)
        {
            return !await _userRepository.ExistsByEmailAsync(email);
        }

        public async Task<bool> IsUserNameUniqueAsync(string userName)
        {
            return !await _userRepository.ExistsByUserNameAsync(userName);
        }

        public async Task<User> CreateUserAsync(string firstName, string lastName, string email, string password, string phone, string userName)
        {
            var passwordHash = PasswordHelper.HashPassword(password);
            var user = new User(firstName, lastName, email, passwordHash, phone, userName);
            
            return await _userRepository.AddAsync(user);
        }

        public async Task<User> UpdateUserProfileAsync(int userId, string firstName, string lastName, string phone, string? image, DateTime? birthday)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                throw new ApplicationException($"User with ID {userId} not found");

            user.UpdateProfile(firstName, lastName, phone, image, birthday);
            await _userRepository.UpdateAsync(user);
            
            return user;
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }
    }
}
