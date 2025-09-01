using Minton.Application.Account.Requests;
using Minton.Application.Account.Responses;

namespace Minton.Application.Account.Services
{
    public interface IAccountService
    {
        Task<CreateUserResponse> CreateUserAsync(CreateUserRequest request);
        Task<UserResponse?> GetUserByIdAsync(int id);
    }
}
