-- Alterando o nome das colunas para seguir o padrao camelCase
ALTER TABLE users RENAME COLUMN first_name TO "firstName";
ALTER TABLE users RENAME COLUMN last_name TO "lastName";


-- Adicionando as colunas de timestamp para controle de criacao e atualizacao
ALTER TABLE users ADD COLUMN "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE users ADD COLUMN "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
