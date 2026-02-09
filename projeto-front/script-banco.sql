-- =============================================
-- 1. CRIAÇÃO DA TABELA
-- =============================================
CREATE TABLE Contatos (
    IdPessoa INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(MAX),
    DataNascimento DATETIME2,
    Observacoes NVARCHAR(MAX),
    Telefone NVARCHAR(MAX),
    Email NVARCHAR(MAX)
);
GO

-- =============================================
-- 2. STORED PROCEDURES (CRUD)
-- =============================================

-- Inserção de Novo Contato
CREATE PROCEDURE sp_InserirContato
    @nome nvarchar(max), 
    @dataNascimento datetime2, 
    @observacoes nvarchar(max), 
    @telefone nvarchar(max), 
    @email nvarchar(max)
AS BEGIN
    INSERT INTO Contatos (Nome, DataNascimento, Observacoes, Telefone, Email)
    VALUES (@nome, @dataNascimento, @observacoes, @telefone, @email);
    SELECT SCOPE_IDENTITY() AS idPessoa;
END;
GO

-- Atualização de Contato Existente
CREATE PROCEDURE sp_AtualizarContato
    @idPessoa int, 
    @nome nvarchar(max), 
    @dataNascimento datetime2, 
    @observacoes nvarchar(max), 
    @telefone nvarchar(max), 
    @email nvarchar(max)
AS BEGIN
    UPDATE Contatos 
    SET Nome=@nome, 
        DataNascimento=@dataNascimento, 
        Observacoes=@observacoes, 
        Telefone=@telefone, 
        Email=@email
    WHERE IdPessoa = @idPessoa;
END;
GO

-- Remoção de Contato
CREATE PROCEDURE sp_RemoverContato 
    @idPessoa int
AS BEGIN
    DELETE FROM Contatos WHERE IdPessoa = @idPessoa;
END;
GO

-- Listagem de Todos os Contatos
CREATE PROCEDURE sp_ListarContatos
AS BEGIN
    SELECT * FROM Contatos;
END;
GO

-- Obter um Contato Específico por ID
CREATE PROCEDURE sp_ObterContatoPorId 
    @idPessoa int
AS BEGIN
    SELECT * FROM Contatos WHERE IdPessoa = @idPessoa;
END;
GO