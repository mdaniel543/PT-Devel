using ApiWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;

namespace ApiWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EncuestaController : Controller
    {
        private readonly DbAcmeContext _context;

        public EncuestaController(DbAcmeContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetEncuestas")]
        public IActionResult GetEncuestas()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var rToken = Jwt.validarToken(identity);

            if (!rToken.success) return BadRequest(rToken);

            return Ok(_context.Encuesta.ToList());
        }

        [HttpGet("one/{id}", Name="GetEncuestaById")]
        public IActionResult GetEncuestaByID(int id)
        {
            var encuesta = _context.Encuesta.Where(e => e.IdEncuesta == id).FirstOrDefault();

            return Ok(encuesta);
        }
        

        [HttpGet("{id}", Name = "GetEncuestaByUsuario")]
        public IActionResult GetEncuesta(int id)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var rToken = Jwt.validarToken(identity);

            if (!rToken.success) return BadRequest(rToken);

            var encuesta = _context.Encuesta.Where(e => e.IdUsuario == id).ToList();

            return Ok(encuesta);
        }

        [HttpPost(Name = "PostEncuesta")]
        public dynamic PostEncuesta([FromBody] Object data)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                var rToken = Jwt.validarToken(identity);

                if (!rToken.success || rToken == null) return BadRequest(rToken);

                var temp = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                int id_usuario = int.Parse(rToken?.id);

                var usuario = _context.Usuarios.Where(u => (int)u.IdUsuario == (int)id_usuario).FirstOrDefault();

                if (usuario == null) return BadRequest(new { message = "No existe el usuario" });

                var encuesta = new Encuestum
                {
                    Nombre = temp.nombre.ToString(),
                    Descripcion = temp.descripcion.ToString(),
                    Estado = true,
                    IdUsuario = id_usuario,
                    IdUsuarioNavigation = usuario
                };

                _context.Encuesta.Add(encuesta);
                _context.SaveChanges();

                // retorna mensaje y el id ingresado
                return Ok(new { message = "Encuesta creada con exito", id = encuesta.IdEncuesta });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}", Name = "PutEncuesta")]
        public IActionResult PutEncuesta(int id, [FromBody] Object data)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var rToken = Jwt.validarToken(identity);

            if (!rToken.success) return BadRequest(rToken);

            var existe = _context.Encuesta.FirstOrDefault(e => e.IdEncuesta == id);

            if (existe == null) return BadRequest(new { message = "No existe la encuesta" });

            var temp = JsonConvert.DeserializeObject<dynamic>(data.ToString());

            existe.Nombre = temp.nombre.ToString();
            existe.Descripcion = temp.descripcion.ToString();

            _context.SaveChanges();

            return Ok(new { message = "Encuesta actualizada con exito" });
        }

        [HttpDelete("{id}", Name = "DeleteEncuesta")]
        public IActionResult DeleteEncuesta(int id)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var rToken = Jwt.validarToken(identity);

            if (!rToken.success) return BadRequest(rToken);

            var existe = _context.Encuesta.FirstOrDefault(e => e.IdEncuesta == id);

            if (existe == null) return BadRequest(new { message = "No existe la encuesta" });

            existe.Estado = false;

            _context.SaveChanges();

            return Ok(new { message = "Encuesta eliminada con exito" });
        }
    }
}
