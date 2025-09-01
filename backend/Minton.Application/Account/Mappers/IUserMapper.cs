using Minton.Application.Account.Responses;
using Minton.Core.Account.Entities;

namespace Minton.Application.Account.Mappers
{
    public interface IUserMapper
    {
        CreateUserResponse ToCreateUserResponse(User user);
        UserResponse ToUserResponse(User user);
    }
}
