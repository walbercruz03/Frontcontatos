# 📑 Sistema de Gestão de Contatos - Desafio Full Stack

Esta é uma aplicação completa para gerenciamento de contatos, desenvolvida como parte de um desafio técnico. O projeto demonstra a integração entre um banco de dados relacional, uma API robusta e uma interface moderna.

## 🛠️ Tecnologias Utilizadas

* **Frontend**: Angular (Standalone Components).
* **Backend**: .NET 10 (Web API) com Entity Framework Core.
* **Banco de Dados**: SQL Server utilizando Stored Procedures para operações de CRUD.

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo na ordem indicada para garantir o funcionamento correto:

### 1. Banco de Dados (SQL Server) 🏛️
1.  Localize o arquivo `script-banco.sql` na raiz do repositório.
2.  Abra o seu gerenciador de banco de dados (SSMS ou VS Code).
3.  Execute o script completo para criar a tabela `Contatos` e as 5 Stored Procedures:
    * `sp_InserirContato` (Realiza a inserção e retorna o ID via `SCOPE_IDENTITY`).
    * `sp_ListarContatos`.
    * `sp_ObterContatoPorId`.
    * `sp_AtualizarContato`.
    * `sp_RemoverContato`.

### 2. Backend (API .NET) ⚙️
1.  Acesse a pasta `ContatosApi`.
2.  Abra o arquivo de solução `ContatosApi.sln` no Visual Studio.
3.  **Configuração**: No arquivo `appsettings.json`, verifique se a `DefaultConnection` está apontando para o seu servidor local.
4.  Pressione **F5** ou clique em **Run** para iniciar a API.
    * *Nota: A API está configurada para rodar em `https://localhost:7206`. O ID gerado em novos cadastros será exibido no Console de Saída (Output) do Visual Studio*.

### 3. Frontend (Angular) 🌐
1.  Abra a pasta do projeto frontend no seu terminal.
2.  Instale as dependências necessárias:
    ```bash
    npm install
    ```
3.  Inicie a aplicação:
    ```bash
    npm start
    ```
4.  Acesse `http://localhost:4200` no seu navegador.

---

## 🧩 Funcionalidades e Requisitos Atendidos

* **CRUD Completo**: Integração total entre Angular, .NET e SQL Server via Procedures.
* **Feedback ao Usuário**: Validação de campos obrigatórios (Nome, Telefone) e confirmação de cadastro.
* **Logs de Sistema**: Exibição do ID real retornado pelo banco de dados no console do Backend.
* **Campos Adicionais**: Suporte para Data de Nascimento e Observações.
