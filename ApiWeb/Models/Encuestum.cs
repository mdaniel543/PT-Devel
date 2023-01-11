using System;
using System.Collections.Generic;

namespace ApiWeb.Models;

public partial class Encuestum
{
    public int IdEncuesta { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public bool Estado { get; set; }

    public int IdUsuario { get; set; }

    public virtual ICollection<Campo> Campos { get; } = new List<Campo>();

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
