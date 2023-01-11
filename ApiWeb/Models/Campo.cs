using System;
using System.Collections.Generic;

namespace ApiWeb.Models;

public partial class Campo
{
    public int IdCampo { get; set; }

    public int IdEncuesta { get; set; }

    public int IdTipo { get; set; }

    public string Nombre { get; set; } = null!;

    public string Titulo { get; set; } = null!;

    public bool EsRequerido { get; set; }

    public virtual Encuestum IdEncuestaNavigation { get; set; } = null!;

    public virtual Tipo IdTipoNavigation { get; set; } = null!;

    public virtual ICollection<Respuestum> Respuesta { get; } = new List<Respuestum>();
}
