using Minton.Application.Account.Requests;
using Minton.Application.Account.Responses;
using Minton.Application.Account.Mappers;
using Minton.Core.Account.Services;

namespace Minton.Application.Account.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserDomainService _userDomainService;
        private readonly IUserMapper _userMapper;

        public AccountService(IUserDomainService userDomainService, IUserMapper userMapper)
        {
            _userDomainService = userDomainService;
            _userMapper = userMapper;
        }

        public async Task<CreateUserResponse> CreateUserAsync(CreateUserRequest request)
        {
            // Validate uniqueness
            if (!await _userDomainService.IsEmailUniqueAsync(request.Email))
                throw new ApplicationException($"Email '{request.Email}' is already taken");

            if (!await _userDomainService.IsUserNameUniqueAsync(request.UserName))
                throw new ApplicationException($"Username '{request.UserName}' is already taken");

            // Create user through domain service
            var user = await _userDomainService.CreateUserAsync(
                request.FirstName,
                request.LastName,
                request.Email,
                request.Password,
                request.Phone,
                request.UserName
            );

            // Map to response
            return _userMapper.ToCreateUserResponse(user);
        }

        public async Task<UserResponse?> GetUserByIdAsync(int id)
        {
            var user = await _userDomainService.GetUserByIdAsync(id);
            
            if (user == null)
                return null;

            return _userMapper.ToUserResponse(user);
        }
    }
}
