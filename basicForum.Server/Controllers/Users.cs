using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using basicForum.Server.Models;
using System.Security.Cryptography;
using System.Text.Json;
using System.Net;
using Microsoft.AspNetCore.Identity.Data;
using System.Text;
using Microsoft.Extensions.Logging;


namespace basicForum.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Users : ControllerBase
    {
        private readonly ILogger<Messages> _logger;

        private readonly DB _db;

        private readonly SHA256 mySHA256 = SHA256.Create();

        private readonly string salt = "MH5EQKasS9l4tEDE";

        private readonly IHttpContextAccessor _httpContextAccessor;

        private const string SessionUsername = "_user";

        public Users(ILogger<Messages> logger, DB db, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("Login")]
        public IActionResult login(LoginAttempt user)
        {
            if(user.username == null || user.password == null)
            {
                return BadRequest("Username or Password is missing");
            }

            User? possible_user = _db.Users.Find(user.username);
            if(possible_user == null)
            {
                return NotFound("No account with this username was found");
            } else if(possible_user.password == null)
            {
                return BadRequest("Invalid Account!");
            }

            Byte[] attempted_password = mySHA256.ComputeHash(Encoding.ASCII.GetBytes(user.password + salt));
            if(attempted_password.SequenceEqual(possible_user.password))
            {
                _httpContextAccessor.HttpContext!.Session.SetString(SessionUsername, user.username);
                CookieOptions options = new CookieOptions();
                options.Expires = DateTime.Now.AddDays(1);
                options.SameSite = SameSiteMode.None;
                options.Secure = true;
                _httpContextAccessor.HttpContext!.Response.Cookies.Append("user", user.username, options);
                return Ok("{\"Result\":\"Login Successful!\"}");
            } else
            {
                return Unauthorized("Login Failed");
            }
        }

        [HttpPost("Signup")]
        public IActionResult signup(LoginAttempt user)
        {
            if (user.username == null || user.password == null)
            {
                return BadRequest("Username or Password is missing");
            }

            User? possible_user = _db.Users.Find(user.username);

            if (possible_user != null)
            {
                return UnprocessableEntity("Username is already taken");
            } else
            {
                Byte[] hashed_password = mySHA256.ComputeHash(Encoding.ASCII.GetBytes(user.password + salt));
                _db.Users.Add(new User() 
                {
                    username = user.username,
                    password = hashed_password
                });
                _db.SaveChanges();
                return Ok("{\"Result\":\"Success\"}");
            }
        }

        [HttpPost("Logout")]
        public IActionResult logout()
        {
            HttpContext.Session.SetString(SessionUsername, "");
            HttpContext.Response.Cookies.Delete("user");
            return Ok("{\"Result\":\"Logged out\"}");
        }
    }
}
