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
  @Input() contatoParaEditar: Contato | null = null;
  @Output() salvou = new EventEmitter<void>();

  // 1. O objeto inicial agora inclui os campos para Nascimento e Observações 📝
  novoContato: Contato = {
    nome: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    observacoes: ''
  };

  constructor(private service: ContatoService) {}

  ngOnChanges(): void {
    if (this.contatoParaEditar) {
      this.novoContato = { ...this.contatoParaEditar };
    }
  }

  cadastrar(): void {
    if (this.novoContato.nome && this.novoContato.telefone) {
      if (this.novoContato.idPessoa) {
        this.service.atualizar(this.novoContato.idPessoa, this.novoContato).subscribe({
          next: (res: any) => {
            alert('Contato atualizado com sucesso!');
            this.finalizar();
          },
          error: (err: any) => console.error('Erro ao atualizar:', err)
        });
      } 
      else {
        // Como o objeto novoContato agora tem todos os campos, 
        // a API receberá os 5 parâmetros corretamente
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

  finalizar(): void {
    this.limparFormulario();
    this.contatoParaEditar = null;
    this.salvou.emit();
  }

  // 2. O método de limpar também foi atualizado para resetar os novos campos 🧼
  limparFormulario(): void {
    this.novoContato = { 
      nome: '', 
      telefone: '', 
      email: '',
      dataNascimento: '',
      observacoes: ''
    };
  }
}