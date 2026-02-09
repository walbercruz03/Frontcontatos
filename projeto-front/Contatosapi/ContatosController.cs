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

        // GET: api/Contatos (Requisito: Listar todos via Procedure)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contato>>> GetTodos()
        {
            return await _context.Contatos
                .FromSqlRaw("EXEC sp_ListarContatos")
                .ToListAsync();
        }

        // GET: api/Contatos/{id} (Requisito: Obter um registro via Procedure)
        [HttpGet("{id}")]
        public async Task<ActionResult<Contato>> GetPorId(int id)
        {
            var contatos = await _context.Contatos
                .FromSqlRaw("EXEC sp_ObterContatoPorId {0}", id)
                .ToListAsync();

            var contato = contatos.FirstOrDefault();
            if (contato == null) return NotFound();

            return Ok(contato);
        }

        // POST: api/Contatos (Requisito: Inserir via Procedure e printar ID no console)
        [HttpPost]
        public async Task<ActionResult> Criar(Contato contato)
        {
            // 1. Usamos SqlQueryRaw para capturar o SELECT SCOPE_IDENTITY() da procedure
            var resultadoId = await _context.Database
                .SqlQueryRaw<decimal>("EXEC sp_InserirContato {0}, {1}, {2}, {3}, {4}",
                    contato.Nome!, contato.DataNascimento, contato.Observacoes ?? string.Empty, contato.Telefone!, contato.Email!)
                .ToListAsync();

            // 2. Extraímos o ID gerado (o primeiro item da lista)
            var novoId = resultadoId.FirstOrDefault();

            // 3. Requisito Atendido: Printar o ID real no console
            Console.WriteLine($"ID retornado pela procedure: {novoId}");

            // Retornamos o ID para o Frontend também poder usar
            return Ok(new { id = novoId, mensagem = "Contato criado com sucesso!" });
        }

        // PUT: api/Contatos/{id} (Requisito: Atualizar via Procedure e retornar "OK")
        [HttpPut("{id}")]
        public async Task<ActionResult> Atualizar(int id, Contato contato)
        {
            await _context.Database.ExecuteSqlRawAsync(
                "EXEC sp_AtualizarContato {0}, {1}, {2}, {3}, {4}, {5}",
                id, contato.Nome!, contato.DataNascimento, contato.Observacoes ?? string.Empty, contato.Telefone!, contato.Email!);

            // Requisito Atendido: Retornar o texto "OK"
            return Ok(new { mensagem = "OK" });
        }

        // DELETE: api/Contatos/{id} (Requisito: Remover via Procedure)
        [HttpDelete("{id}")]
        public async Task<ActionResult> Deletar(int id)
        {
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_RemoverContato {0}", id);
            return Ok(new { mensagem = "Removido com sucesso!" });
        }
    }
}