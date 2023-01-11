using ApiWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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

        [HttpGet("{id}", Name = "GetCamposByEncuesta")]
        public IActionResult GetCampos(int id)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var rToken = Jwt.validarToken(identity);

            if (!rToken.success) return BadRequest(rToken);

            var campos = _context.Campos.Where(c => c.IdEncuesta == id).ToList();

            return Ok(campos);
        }

        [HttpPost(Name = "PostCampo")]
        public dynamic PostCampo([FromBody] Object data)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                var rToken = Jwt.validarToken(identity);

                if (!rToken.success || rToken == null) return BadRequest(rToken);

                var temp = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                int id_encuesta = int.Parse(temp?.idEncuesta.ToString());

                var encuesta = _context.Encuesta.Where(e => (int)e.IdEncuesta == (int)id_encuesta).FirstOrDefault();

                if (encuesta == null) return BadRequest(new { success = false, message = "La encuesta no existe" });

                // arreglo de campos 

                var campos = JsonConvert.DeserializeObject<List<dynamic>>(temp?.campos.ToString());

                foreach (var campo in campos)
                {
                    int id_tipo = int.Parse(campo?.idTipo.ToString());

                    var tipo = _context.Tipos.Where(e => (int)e.IdTipo == (int)id_tipo).FirstOrDefault();

                    if (tipo == null) return BadRequest(new { success = false, message = "El tipo no existe" });

                    var cam = new Campo
                    {
                        IdEncuesta = id_encuesta,
                        Nombre = campo?.nombre.ToString(),
                        EsRequerido = bool.Parse(campo?.esRequerido.ToString()),
                        IdTipo = id_tipo,
                        Titulo = campo?.titulo.ToString(),
                        IdEncuestaNavigation = encuesta,
                        IdTipoNavigation = tipo
                    };
                    _context.Campos.Add(cam);
                }
                _context.SaveChanges();
                return Ok(new { message = "Campo de la encuestra registrado correctamente" });
            }
            catch (Exception ex) {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}", Name = "PutCampo")]
        public dynamic PutCampo(int id, [FromBody] Object data)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                var rToken = Jwt.validarToken(identity);

                if (!rToken.success || rToken == null) return BadRequest(rToken);

                var temp = JsonConvert.DeserializeObject<dynamic>(data.ToString());

                var campo = _context.Campos.Where(c => (int)c.IdCampo == (int)id).FirstOrDefault();

                if (campo == null) return BadRequest(new { success = false, message = "El campo no existe" });


                int id_tipo = int.Parse(temp?.idTipo.ToString());

                var tipo = _context.Tipos.Where(e => (int)e.IdTipo == (int)id_tipo).FirstOrDefault();

                if (tipo == null) return BadRequest(new { success = false, message = "El tipo no existe" });

                campo.Nombre = temp?.nombre.ToString();
                campo.EsRequerido = bool.Parse(temp?.esRequerido.ToString());
                campo.IdTipo = id_tipo;
                campo.Titulo = temp?.titulo.ToString();
                campo.IdTipoNavigation = tipo;

                _context.SaveChanges();

                return Ok(new { message = "Campo de la encuesta actualizado correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}", Name = "DeleteCampo")]
        public dynamic DeleteCampo(int id)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;

                var rToken = Jwt.validarToken(identity);

                if (!rToken.success || rToken == null) return BadRequest(rToken);

                // eliminar todas las respuestas del campo

                var resps = _context.Respuesta.Where(r => r.IdCampo == id).ToList();

                foreach (var resp in resps)
                {
                    _context.Respuesta.Remove(resp);
                }

                var campo = _context.Campos.Where(c => (int)c.IdCampo == (int)id).FirstOrDefault();

                if (campo == null) return BadRequest(new { success = false, message = "El campo no existe" });

                _context.Campos.Remove(campo);
                _context.SaveChanges();

                return Ok(new { message = "Campo de la encuesta eliminado correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


    }
}
