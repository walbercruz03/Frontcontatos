import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContatoService, Contato } from '../../services/contato.service';

@Component({
  selector: 'app-contato-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato-lista.html',
  styleUrl: './contato-lista.css',
})
export class ContatoListaComponent implements OnInit {
  contatos: Contato[] = [];
  contatosFiltrados: Contato[] = [];
  termoBusca: string = '';

  // Evento que vai avisar o app.ts que um contato foi selecionado para edição
  @Output() editarContato = new EventEmitter<Contato>();

  constructor(private service: ContatoService) {}

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(): void {
    this.service.getContatos().subscribe({
      next: (dados) => {
        this.contatos = dados;
        this.contatosFiltrados = dados;
      },
      // Corrigido para (erro: any) para evitar o erro de compilação que você teve antes
      error: (erro: any) => console.error('Erro ao buscar contatos:', erro)
    });
  }

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase();
    this.contatosFiltrados = this.contatos.filter(contato =>
      contato.nome.toLowerCase().includes(termo) || 
      contato.email.toLowerCase().includes(termo)
    );
  }

  // Função para enviar o contato para o formulário 
  prepararEdicao(contato: Contato): void {
    this.editarContato.emit(contato);
    // Role para o topo para que o usuário veja o formulário preenchido
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Função para excluir 
  excluirContato(id?: number): void {
    if (id && confirm('Deseja realmente excluir este contato?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          alert('Contato removido com sucesso!');
          this.carregarContatos(); // Recarrega a lista do banco
        },
        error: (erro: any) => console.error('Erro ao excluir:', erro)
      });
    }
  }
}