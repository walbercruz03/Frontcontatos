import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContatoService, Contato } from '../../services/contato.service';

@Component({
  selector: 'app-contato-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato-form.html',
  styleUrl: './contato-form.css'
})
export class ContatoFormComponent implements OnChanges {
  // Recebe o contato que foi clicado na lista para editar
  @Input() contatoParaEditar: Contato | null = null;
  
  // Avisa a lista para atualizar quando terminar de salvar
  @Output() salvou = new EventEmitter<void>();

  novoContato: Contato = {
    nome: '',
    telefone: '',
    email: ''
  };

  constructor(private service: ContatoService) {}

  // Quando o usuário clica em "Editar" na lista, este método joga os dados no form
  ngOnChanges(): void {
    if (this.contatoParaEditar) {
      this.novoContato = { ...this.contatoParaEditar };
    }
  }

  cadastrar(): void {
    if (this.novoContato.nome && this.novoContato.telefone) {
      
      // Se tiver idPessoa, significa que estamos EDITANDO 
      if (this.novoContato.idPessoa) {
        this.service.atualizar(this.novoContato.idPessoa, this.novoContato).subscribe({
          next: (res: any) => {
            alert('Contato atualizado com sucesso!');
            this.finalizar();
          },
          error: (err: any) => console.error('Erro ao atualizar:', err)
        });
      } 
      // Se não tiver ID, estamos CADASTRANDO 
      else {
        this.service.salvar(this.novoContato).subscribe({
          next: (res: any) => {
            alert('Contato cadastrado com sucesso!');
            this.finalizar();
          },
          error: (err: any) => console.error('Erro ao cadastrar:', err)
        });
      }

    } else {
      alert('Preencha pelo menos nome e telefone!');
    }
  }

  // Limpa o formulário e avisa que terminou
  finalizar(): void {
    this.limparFormulario();
    this.contatoParaEditar = null;
    this.salvou.emit(); // Emite o evento para a lista atualizar
   
  }

  limparFormulario(): void {
    this.novoContato = { nome: '', telefone: '', email: '' };
  }
}