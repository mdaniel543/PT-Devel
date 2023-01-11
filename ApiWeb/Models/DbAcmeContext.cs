using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ApiWeb.Models;

public partial class DbAcmeContext : DbContext
{
    public DbAcmeContext()
    {
    }

    public DbAcmeContext(DbContextOptions<DbAcmeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Campo> Campos { get; set; }

    public virtual DbSet<Encuestum> Encuesta { get; set; }

    public virtual DbSet<Respuestum> Respuesta { get; set; }

    public virtual DbSet<Tipo> Tipos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-TDH7JF9P;Database=db-acme;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Campo>(entity =>
        {
            entity.HasKey(e => e.IdCampo).HasName("PK__campo__C1F0647E4D924361");

            entity.ToTable("campo");

            entity.Property(e => e.IdCampo).HasColumnName("id_campo");
            entity.Property(e => e.EsRequerido).HasColumnName("es_requerido");
            entity.Property(e => e.IdEncuesta).HasColumnName("id_encuesta");
            entity.Property(e => e.IdTipo).HasColumnName("id_tipo");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Titulo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("titulo");

            entity.HasOne(d => d.IdEncuestaNavigation).WithMany(p => p.Campos)
                .HasForeignKey(d => d.IdEncuesta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_campo_encuesta");

            entity.HasOne(d => d.IdTipoNavigation).WithMany(p => p.Campos)
                .HasForeignKey(d => d.IdTipo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_campo_tipo");
        });

        modelBuilder.Entity<Encuestum>(entity =>
        {
            entity.HasKey(e => e.IdEncuesta).HasName("PK__encuesta__013535C34616903F");

            entity.ToTable("encuesta");

            entity.Property(e => e.IdEncuesta).HasColumnName("id_encuesta");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Estado).HasColumnName("estado");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Encuesta)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_usuario_encuesta");
        });

        modelBuilder.Entity<Respuestum>(entity =>
        {
            entity.HasKey(e => e.IdRespuesta).HasName("PK__respuest__14E5558913076307");

            entity.ToTable("respuesta");

            entity.Property(e => e.IdRespuesta).HasColumnName("id_respuesta");
            entity.Property(e => e.IdCampo).HasColumnName("id_campo");
            entity.Property(e => e.Valor)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("valor");

            entity.HasOne(d => d.IdCampoNavigation).WithMany(p => p.Respuesta)
                .HasForeignKey(d => d.IdCampo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_respuesta_campo");
        });

        modelBuilder.Entity<Tipo>(entity =>
        {
            entity.HasKey(e => e.IdTipo).HasName("PK__tipo__CF90108998772756");

            entity.ToTable("tipo");

            entity.Property(e => e.IdTipo).HasColumnName("id_tipo");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__usuario__4E3E04AD94D412D0");

            entity.ToTable("usuario");

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
