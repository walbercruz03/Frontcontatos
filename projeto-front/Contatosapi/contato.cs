// Contato.cs
public class Contato {
    public int IdPessoa { get; set; }
    public string? Nome { get; set; }
    public DateTime DataNascimento { get; set; }
    public string? Observacoes { get; set; }
    public string? Telefone { get; set; }
    public string? Email { get; set; }
}

// AppDbContext.cs
using Microsoft.EntityFrameworkCore;
public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Contato> Contatos { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Contato>().HasKey(c => c.IdPessoa);
    }
}