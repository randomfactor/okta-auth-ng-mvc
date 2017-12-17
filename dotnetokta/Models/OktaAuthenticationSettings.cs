using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetokta.Models
{
    public class OktaAuthenticationSettings
    {
        public string Authority { get; set; }
        public string Audience { get; set; }
    }
}