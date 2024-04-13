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
    public class Forums : ControllerBase
    {
        private readonly ILogger<Messages> _logger;

        private readonly DB _db;

        public Forums(DB db, ILogger<Messages> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Forum>> Get()
        {
            return Ok(_db.Forums);
        }

        [HttpPost]
        public IActionResult Post(Forum forum)
        {
            if (forum == null || forum.Name == null)
            {
                return BadRequest("Missing Name of forum");
            }

            Forum? existing_forum = _db.Forums.Find(forum.Name);
            if (existing_forum != null)
            {
                return BadRequest("Forum with name already exists");
            } else
            {
                _db.Forums.Add(new Forum() {
                    Name = forum.Name,
                    Description = forum.Description
                });
                _db.SaveChanges();
                return Ok("{\"Result\":\"Successfully added new forum: " + forum.Name+"\"}");
            }
        }

        [HttpDelete("{name}")]
        public IActionResult Delete(string name)
        {
            if(name.All(char.IsAsciiLetterOrDigit))
            {
                Forum? possible_forum = _db.Forums.Find(name);

                if(possible_forum == null)
                {
                    return NotFound("The specified forum was not found");
                } else
                {
                    _db.Forums.Remove(possible_forum);
                    _db.SaveChanges();
                    return Ok("{\"Result\":\"The forum with the name " + name + " was successfully deleted.\"}");
                }
            }
            else
            {
                return BadRequest("Invalid forum name");
            }
        }
    }
}
