using Minton.Application.Account.Responses;
using Minton.Core.Account.Entities;

namespace Minton.Application.Account.Mappers
{
    public class UserMapper : IUserMapper
    {
        public CreateUserResponse ToCreateUserResponse(User user)
        {
            return new CreateUserResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName,
                Phone = user.Phone,
                Image = user.Image,
                Birthday = user.Birthday,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt
            };
        }

        public UserResponse ToUserResponse(User user)
        {
            return new UserResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName,
                Phone = user.Phone,
                Image = user.Image,
                Birthday = user.Birthday,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt
            };
        }
    }
}
