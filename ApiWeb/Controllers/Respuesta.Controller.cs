using ApiWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;


namespace ApiWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RespuestaController : Controller
    {
        private readonly DbAcmeContext _context;

        public RespuestaController(DbAcmeContext context)
        {
            _context = context;
        }

        [HttpGet("{id}", Name = "GetRespuestasByEncuesta")]
        public IActionResult GetRespuestas(int id)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var rToken = Jwt.validarToken(identity);

            if (!rToken.success) return BadRequest(rToken);

            var respuestas = _context.Respuesta.Where(r => r.IdCampoNavigation.IdEncuesta == id).ToList();

            return Ok(respuestas);
        }

        [HttpPost(Name = "PostRespuesta")]
        public dynamic PostRespuesta([FromBody] Object data)
        {
            try
            {
                var temp = JsonConvert.DeserializeObject<dynamic>(data.ToString());
                
                var respuestas = JsonConvert.DeserializeObject<List<dynamic>>(temp?.resps.ToString());

                foreach (var res in respuestas)
                {
                    int id_campo = int.Parse(res?.idCampo.ToString());

                    var campo = _context.Campos.Where(c => (int)c.IdCampo == (int)id_campo).FirstOrDefault();

                    if (campo == null) return BadRequest(new { success = false, message = "El campo no existe" });

                    var respuesta = new Respuestum
                    {
                        IdCampo = id_campo,
                        Valor = res?.valor.ToString(),
                        IdCampoNavigation = campo
                    };

                    _context.Respuesta.Add(respuesta);
                }

                _context.SaveChanges();

                return Ok(new { success = true, message = "Respuestas guardadas" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    }
}