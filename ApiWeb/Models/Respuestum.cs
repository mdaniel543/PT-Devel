using System;
using System.Collections.Generic;

namespace ApiWeb.Models;

public partial class Respuestum
{
    public int IdRespuesta { get; set; }

    public int IdCampo { get; set; }

    public string Valor { get; set; } = null!;

    public virtual Campo IdCampoNavigation { get; set; } = null!;
}
