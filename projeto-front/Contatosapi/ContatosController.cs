using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContatosApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContatosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContatosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contato>>> GetTodos()
        {
            return await _context.Contatos.FromSqlRaw("EXEC sp_ListarContatos").ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contato>> GetPorId(int id)
        {
            var contatos = await _context.Contatos.FromSqlRaw("EXEC sp_ObterContatoPorId {0}", id).ToListAsync();
            var contato = contatos.FirstOrDefault();
            if (contato == null) return NotFound();
            return Ok(contato);
        }

        [HttpPost]
        public async Task<ActionResult> Criar(Contato contato)
        {
            var resultado = await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_InserirContato {0}, {1}, {2}, {3}, {4}",
                contato.Nome, contato.DataNascimento, contato.Observacoes, contato.Telefone, contato.Email);
            Console.WriteLine($"ID retornado pela procedure: {resultado}");
            return Ok(new { mensagem = "Contato criado com sucesso via Procedure!" });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Atualizar(int id, Contato contato)
        {
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_AtualizarContato {0}, {1}, {2}, {3}, {4}, {5}",
                id, contato.Nome, contato.DataNascimento, contato.Observacoes, contato.Telefone, contato.Email);
            return Ok(new { mensagem = "Texto retornado: OK" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Deletar(int id)
        {
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_RemoverContato {0}", id);
            return Ok(new { mensagem = "Removido com sucesso!" });
        }
    }
}