using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using dotnetokta.Models;

namespace dotnetokta.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<HeldValue> Get()
        {
            return (ValuesRepository.Instance.GetAll());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
            var ownerClaim = this.User.Claims.FirstOrDefault((c) => c.Type == "uid");
            if (ownerClaim != null)
            {
                string ownerId = ownerClaim.Issuer + "." + ownerClaim.Value;
                ValuesRepository.Instance.Create(value, ownerId, "Get This Somehow");
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]string value)
        {
        }

        // DELETE api/values/"take care of your pets"
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string name = id;
            string ownerId;

            var ownerClaim = this.User.Claims.FirstOrDefault((c) => c.Type == "uid");
            if (ownerClaim != null)
            {
                ownerId = ownerClaim.Issuer + "." + ownerClaim.Value;
            
                if (ValuesRepository.Instance.Delete(name, ownerId))
                {
                    return (Ok(name));
                }
            }

            return (NotFound(name));
        }
    }
}
