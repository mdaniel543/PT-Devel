using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiWeb.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tipo",
                columns: table => new
                {
                    idtipo = table.Column<int>(name: "id_tipo", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tipo__CF90108998772756", x => x.idtipo);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    idusuario = table.Column<int>(name: "id_usuario", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    password = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__usuario__4E3E04AD94D412D0", x => x.idusuario);
                });

            migrationBuilder.CreateTable(
                name: "encuesta",
                columns: table => new
                {
                    idencuesta = table.Column<int>(name: "id_encuesta", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    descripcion = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    estado = table.Column<bool>(type: "bit", nullable: false),
                    idusuario = table.Column<int>(name: "id_usuario", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__encuesta__013535C34616903F", x => x.idencuesta);
                    table.ForeignKey(
                        name: "FK_usuario_encuesta",
                        column: x => x.idusuario,
                        principalTable: "usuario",
                        principalColumn: "id_usuario");
                });

            migrationBuilder.CreateTable(
                name: "campo",
                columns: table => new
                {
                    idcampo = table.Column<int>(name: "id_campo", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idencuesta = table.Column<int>(name: "id_encuesta", type: "int", nullable: false),
                    idtipo = table.Column<int>(name: "id_tipo", type: "int", nullable: false),
                    nombre = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    titulo = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    esrequerido = table.Column<bool>(name: "es_requerido", type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__campo__C1F0647E4D924361", x => x.idcampo);
                    table.ForeignKey(
                        name: "fk_campo_encuesta",
                        column: x => x.idencuesta,
                        principalTable: "encuesta",
                        principalColumn: "id_encuesta");
                    table.ForeignKey(
                        name: "fk_campo_tipo",
                        column: x => x.idtipo,
                        principalTable: "tipo",
                        principalColumn: "id_tipo");
                });

            migrationBuilder.CreateTable(
                name: "respuesta",
                columns: table => new
                {
                    idrespuesta = table.Column<int>(name: "id_respuesta", type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idcampo = table.Column<int>(name: "id_campo", type: "int", nullable: false),
                    valor = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__respuest__14E5558913076307", x => x.idrespuesta);
                    table.ForeignKey(
                        name: "fk_respuesta_campo",
                        column: x => x.idcampo,
                        principalTable: "campo",
                        principalColumn: "id_campo");
                });

            migrationBuilder.CreateIndex(
                name: "IX_campo_id_encuesta",
                table: "campo",
                column: "id_encuesta");

            migrationBuilder.CreateIndex(
                name: "IX_campo_id_tipo",
                table: "campo",
                column: "id_tipo");

            migrationBuilder.CreateIndex(
                name: "IX_encuesta_id_usuario",
                table: "encuesta",
                column: "id_usuario");

            migrationBuilder.CreateIndex(
                name: "IX_respuesta_id_campo",
                table: "respuesta",
                column: "id_campo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "respuesta");

            migrationBuilder.DropTable(
                name: "campo");

            migrationBuilder.DropTable(
                name: "encuesta");

            migrationBuilder.DropTable(
                name: "tipo");

            migrationBuilder.DropTable(
                name: "usuario");
        }
    }
}
