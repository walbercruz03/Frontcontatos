import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contato {
  idPessoa?: number;
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;  
  observacoes: string;     
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'https://localhost:7206/api/Contatos';

  constructor(private http: HttpClient) { }

  // Listar contatos
  getContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  //  Remover contato
  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //  Cadastrar contato
  salvar(contato: Contato): Observable<any> {
    return this.http.post<any>(this.apiUrl, contato);
  }

//    Atualizar contato
  atualizar(id: number, contato: Contato): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contato);
  }
}