using Microsoft.AspNetCore.Mvc;
using ApiWeb.Models;
using System.Security.Cryptography;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace ApiWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : Controller
    {
        public IConfiguration _configuration;

        private readonly DbAcmeContext _context;

        public UsuarioController(DbAcmeContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet(Name = "GetUsuarios")]
        public IEnumerable<Usuario> Get()
        {
            return _context.Usuarios.ToList();
        }


        // Registrar usuario con encriptacion de password
        [HttpPost(Name = "PostUsuarios")]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            try
            {
                //verificar si existe el correo
                var existe = _context.Usuarios.FirstOrDefault(u => u.Email == usuario.Email);
                if (existe != null)
                {
                    return BadRequest(new { message = "El correo ya existe" });
                }
                // encriptar password
                usuario.Password = Convert.ToBase64String(SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(usuario.Password)));
                _context.Usuarios.Add(usuario);
                _context.SaveChanges();
                // retorno un mensaje de exito
                return Ok(new { message = "Usuario registrado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        // Login
        [HttpPost("login", Name = "Login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            try
            {
                // encriptar password
                usuario.Password = Convert.ToBase64String(SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(usuario.Password)));
                // verificar si existe el usuario
                var existe = _context.Usuarios.FirstOrDefault(u => u.Email == usuario.Email && u.Password == usuario.Password);
                if (existe == null)
                {
                    return BadRequest(new { message = "Usuario o contraseña incorrectos" });
                }
                var jwt = _configuration.GetSection("Jwt").Get<Jwt>();
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", existe.IdUsuario.ToString()),
                    new Claim("Email", existe.Email),
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: jwt.Issuer,
                    audience: jwt.Audience,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    message = "Usuario logueado con exito"
                });

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

    }
}
