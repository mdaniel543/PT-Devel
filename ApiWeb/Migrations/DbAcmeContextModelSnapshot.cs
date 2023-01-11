﻿// <auto-generated />
using ApiWeb.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ApiWeb.Migrations
{
    [DbContext(typeof(DbAcmeContext))]
    partial class DbAcmeContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ApiWeb.Models.Campo", b =>
                {
                    b.Property<int>("IdCampo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id_campo");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdCampo"));

                    b.Property<bool>("EsRequerido")
                        .HasColumnType("bit")
                        .HasColumnName("es_requerido");

                    b.Property<int>("IdEncuesta")
                        .HasColumnType("int")
                        .HasColumnName("id_encuesta");

                    b.Property<int>("IdTipo")
                        .HasColumnType("int")
                        .HasColumnName("id_tipo");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("nombre");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("titulo");

                    b.HasKey("IdCampo")
                        .HasName("PK__campo__C1F0647E4D924361");

                    b.HasIndex("IdEncuesta");

                    b.HasIndex("IdTipo");

                    b.ToTable("campo", (string)null);
                });

            modelBuilder.Entity("ApiWeb.Models.Encuestum", b =>
                {
                    b.Property<int>("IdEncuesta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id_encuesta");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdEncuesta"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("descripcion");

                    b.Property<bool>("Estado")
                        .HasColumnType("bit")
                        .HasColumnName("estado");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int")
                        .HasColumnName("id_usuario");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("nombre");

                    b.HasKey("IdEncuesta")
                        .HasName("PK__encuesta__013535C34616903F");

                    b.HasIndex("IdUsuario");

                    b.ToTable("encuesta", (string)null);
                });

            modelBuilder.Entity("ApiWeb.Models.Respuestum", b =>
                {
                    b.Property<int>("IdRespuesta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id_respuesta");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRespuesta"));

                    b.Property<int>("IdCampo")
                        .HasColumnType("int")
                        .HasColumnName("id_campo");

                    b.Property<string>("Valor")
                        .IsRequired()
                        .HasMaxLength(100)
                        .IsUnicode(false)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("valor");

                    b.HasKey("IdRespuesta")
                        .HasName("PK__respuest__14E5558913076307");

                    b.HasIndex("IdCampo");

                    b.ToTable("respuesta", (string)null);
                });

            modelBuilder.Entity("ApiWeb.Models.Tipo", b =>
                {
                    b.Property<int>("IdTipo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id_tipo");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdTipo"));

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)")
                        .HasColumnName("nombre");

                    b.HasKey("IdTipo")
                        .HasName("PK__tipo__CF90108998772756");

                    b.ToTable("tipo", (string)null);
                });

            modelBuilder.Entity("ApiWeb.Models.Usuario", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id_usuario");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdUsuario"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)")
                        .HasColumnName("email");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)")
                        .HasColumnName("password");

                    b.HasKey("IdUsuario")
                        .HasName("PK__usuario__4E3E04AD94D412D0");

                    b.ToTable("usuario", (string)null);
                });

            modelBuilder.Entity("ApiWeb.Models.Campo", b =>
                {
                    b.HasOne("ApiWeb.Models.Encuestum", "IdEncuestaNavigation")
                        .WithMany("Campos")
                        .HasForeignKey("IdEncuesta")
                        .IsRequired()
                        .HasConstraintName("fk_campo_encuesta");

                    b.HasOne("ApiWeb.Models.Tipo", "IdTipoNavigation")
                        .WithMany("Campos")
                        .HasForeignKey("IdTipo")
                        .IsRequired()
                        .HasConstraintName("fk_campo_tipo");

                    b.Navigation("IdEncuestaNavigation");

                    b.Navigation("IdTipoNavigation");
                });

            modelBuilder.Entity("ApiWeb.Models.Encuestum", b =>
                {
                    b.HasOne("ApiWeb.Models.Usuario", "IdUsuarioNavigation")
                        .WithMany("Encuesta")
                        .HasForeignKey("IdUsuario")
                        .IsRequired()
                        .HasConstraintName("FK_usuario_encuesta");

                    b.Navigation("IdUsuarioNavigation");
                });

            modelBuilder.Entity("ApiWeb.Models.Respuestum", b =>
                {
                    b.HasOne("ApiWeb.Models.Campo", "IdCampoNavigation")
                        .WithMany("Respuesta")
                        .HasForeignKey("IdCampo")
                        .IsRequired()
                        .HasConstraintName("fk_respuesta_campo");

                    b.Navigation("IdCampoNavigation");
                });

            modelBuilder.Entity("ApiWeb.Models.Campo", b =>
                {
                    b.Navigation("Respuesta");
                });

            modelBuilder.Entity("ApiWeb.Models.Encuestum", b =>
                {
                    b.Navigation("Campos");
                });

            modelBuilder.Entity("ApiWeb.Models.Tipo", b =>
                {
                    b.Navigation("Campos");
                });

            modelBuilder.Entity("ApiWeb.Models.Usuario", b =>
                {
                    b.Navigation("Encuesta");
                });
#pragma warning restore 612, 618
        }
    }
}
