# 📚 FIAP - Sistema de Gerenciamento de Biblioteca

Esta é uma aplicação **Fullstack** desenvolvida como atividade prática para a disciplina de **TypeScript** na FIAP. O projeto consiste em um sistema de gerenciamento de acervo (CRUD) integrado a um banco de dados relacional.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as versões mais recentes das seguintes ferramentas para garantir performance e tipagem forte:

* **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Versão estável mais recente)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Banco de Dados:** PostgreSQL
* **Infraestrutura:** [Docker](https://www.docker.com/) (para containerização do banco de dados)

---

## 📋 Requisitos do Projeto

### Funcionais (CRUD)
A API e a interface permitem realizar as seguintes operações na entidade **Livro**:
- [x] **Create:** Cadastro de novos livros.
- [x] **Read:** Listagem e consulta de livros existentes.
- [x] **Update:** Atualização de dados (Título, Autor, ISBN, Ano).
- [x] **Delete:** Remoção de registros do sistema.

### Estrutura da Entidade
Cada livro possui a seguinte estrutura de dados:
* **Título:** Nome da obra.
* **Autor(a):** Responsável pela escrita.
* **ISBN:** Identificador único internacional.
* **Ano de Publicação:** Ano em que foi lançado.

---

## 🛠️ Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente:

### 1. Pré-requisitos
* **Node.js** (v18 ou superior)
* **Docker** e **Docker Compose**

### 2. Instalação
Clone o repositório e instale as dependências:
```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio
npm install
```

### 3. Banco de Dados (Docker)
Inicie o container do PostgreSQL:
```bash
docker-compose up -d
```

### 4. Configuração do Prisma
Execute as migrações para criar as tabelas no banco:
```bash
npx prisma migrate dev
```

### 5. Executar a Aplicação
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

## 🎓 Objetivo da Atividade
Atividade individual desenvolvida com o objetivo de fixar os conteúdos de TypeScript, integração com bancos de dados (SQL/NoSQL) e criação de APIs robustas.

Nota: Esta é uma atividade de fixação de conteúdo da grade curricular da FIAP.