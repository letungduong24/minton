using Microsoft.AspNetCore.Mvc;
using Minton.Application.Account.Requests;
using Minton.Application.Account.Responses;
using Minton.Application.Account.Services;

namespace Minton.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("create-user")]
        public async Task<ActionResult<CreateUserResponse>> CreateUser([FromBody] CreateUserRequest request)
        {
            try
            {
                var result = await _accountService.CreateUserAsync(request);
                return Ok(result);
            }
            catch (ApplicationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An unexpected error occurred" });
            }
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<UserResponse>> GetUserById(int id)
        {
            try
            {
                var result = await _accountService.GetUserByIdAsync(id);
                
                if (result == null)
                    return NotFound(new { error = "User not found" });
                
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An unexpected error occurred" });
            }
        }
    }
}
