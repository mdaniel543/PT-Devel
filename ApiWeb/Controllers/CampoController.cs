using ApiWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ApiWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CampoController : Controller
    {
        private readonly DbAcmeContext _context;

        public CampoController(DbAcmeContext context)
        {
            _context = context;
        }

        
    }
}
