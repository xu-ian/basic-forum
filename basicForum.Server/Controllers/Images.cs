using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using basicForum.Server.Models;
using System.Net;

namespace basicForum.Server
{
    [Route("[controller]")]
    [ApiController]
    public class Images : ControllerBase
    {
        public Images()
        {

        }

        [HttpGet("{name}")]
        public IActionResult GetProfilePic(string name)
        {
            Byte[] b = System.IO.File.ReadAllBytes("./Images/"+name+".png");
            return File(b, "image/png");
        }
    }
}
