import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContatoListaComponent } from './components/contato-lista/contato-lista'; 
import { ContatoFormComponent } from './components/contato-form/contato-form';
import { Contato } from './services/contato.service'; // Importamos a interface para tipar a variável

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContatoListaComponent, ContatoFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'projeto-front';

  // Esta variável guarda o contato que você clicou em "Editar" na lista
  contatoSendoEditado: Contato | null = null;

  // Este método é chamado quando a lista avisa que quer editar alguém
  setContatoParaEditar(contato: Contato) {
    this.contatoSendoEditado = contato;
  }
}