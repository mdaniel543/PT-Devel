using System;
using System.Collections.Generic;

namespace ApiWeb.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<Encuestum> Encuesta { get; } = new List<Encuestum>();
}
