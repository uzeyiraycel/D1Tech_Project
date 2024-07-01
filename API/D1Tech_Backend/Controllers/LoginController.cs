using D1Tech_Backend.Data;
using D1Tech_Backend.Helpers;
using D1Tech_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace D1Tech_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly D1TechDbContext _context;
        private readonly JwtService _jwtService;

        public LoginController(D1TechDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("Register")]
        public Guid? Register([FromBody] User user)
        {
            user.Id = Guid.NewGuid();

            _context.Users.Add(user);
            _context.SaveChanges();

            return user.Id;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] User user)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);

            if (existingUser == null)
            {
                return Unauthorized("Geçersiz Bilgiler");
            }

            var token = _jwtService.GenerateToken(existingUser.Username);
            return Ok(new { Token = token });
        }
    }
}
