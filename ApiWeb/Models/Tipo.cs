using System;
using System.Collections.Generic;

namespace ApiWeb.Models;

public partial class Tipo
{
    public int IdTipo { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Campo> Campos { get; } = new List<Campo>();
}
