using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using basicForum.Server.Models;
using System.Text.Json;
using System.Net;

namespace basicForum.Server
{
    [Route("[controller]")]
    [ApiController]
    public class Messages : ControllerBase
    {

        private readonly DB _db;

        private readonly ILogger<Messages> _logger;

        public Messages(ILogger<Messages> logger, DB db)
        {
            _db = db;
            _logger = logger;
        }

        //Endpoint that is sent a username and message contents, stores the message in the database, and returns a message Id
        [HttpPost]
        public ActionResult<string?> Put(MessagePartial message)
        {
            try
            {
                Forum? possible_forum = _db.Forums.Find(message.forumName);
                
                if(possible_forum == null)
                {
                    return NotFound("The requested forum does not exist");
                }

                _db.Messages.Add(new Message()
                {
                    username = message.username,
                    message = message.message,
                    forumName = message.forumName,
                    upvotes = 0,
                    downvotes = 0,
                });
                _db.SaveChanges();
                return Ok("{\"Result\":\"Success\"}");
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Problem("{\"Result\":\"" + e.Message + "\"}");
            }
        }

        //Endpoint that gets all messages
        [HttpGet]
        public ActionResult<IEnumerable<Message>> GetMessages([FromQuery] string name, [FromQuery]int limit)
        {
            try
            {
                return Ok(_db.Messages.Where(message => message.forumName == name));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Problem(e.Message);
            }
        }

        //Endpoint that gets a message by Id
        [HttpGet("{id}")]
        public ActionResult<Message> GetMessage(int id) { 
            Message? possible_message = _db.Messages.Find(id);
            if(possible_message == null)
            {
                return NotFound("The requested message was not found!");
            } else
            {
                return Ok(possible_message);
            }
        }

        //Endpoint that upvotes or downvotes a message given a message Id
        [HttpPatch("{id}")]
        public IActionResult UpdateMessage(int id, [FromBody] string? action)
        {
            try
            {
                //Returns 400 if message is missing fields 
                if(action == null)
                {
                    return BadRequest();
                }

                //Tries to find the message from the id, returns 404 if message is not found
                Message? message = _db.Messages.Find(id);

                if(message == null)
                {
                    return NotFound("Message not found");
                }
                
                //Reads the action and updates the Message if the action is valid, returns 422 if action is invalid
                if (action.Equals("upvote"))
                {
                    message.upvotes += 1;
                } else if (action.Equals("downvote"))
                {
                    message.downvotes += 1;
                } else
                {
                    return UnprocessableEntity("Invalid Action");
                }

                _db.Messages.Update(message);
                _db.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Problem(e.Message);
            }
        }

        //Endpoint that deletes a message given a message Id
        [HttpDelete("{id}")]
        public ActionResult<Message> DeleteMessage(int id)
        {
            Message? message = _db.Messages.Find(id);
            if (message == null)
            {
                return NotFound();
            } else
            {
                _db.Messages.Remove(message);
                _db.SaveChanges();
                return Ok(message);
            }
        }
    }
}
