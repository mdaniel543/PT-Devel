using System.Security.Claims;

namespace ApiWeb.Models
{
    public class Jwt
    {
        public string Key { get; set; } = null!;

        public string Issuer { get; set; } = null!;

        public string Audience { get; set; } = null!;

        public string Subject { get; set; } = null!;

        public string Expires { get; set; } = null!;

        public static dynamic validarToken(ClaimsIdentity identity)
        {
            try
            {
                if (identity.Claims.Count() == 0)
                {
                    return new { success = false, message = "Token invalido" };
                }

                var id = identity.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;

                return new { success = true, message = "Token valido", id };

            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = ex.Message,
                    result = ""
                };
            }
        }
    }
}
