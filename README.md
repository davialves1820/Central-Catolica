# Paróquia Manager

Bem-vindo ao repositório do **Paróquia Manager**, um sistema moderno e completo para gestão administrativa e pastoral da sua paróquia. Desenvolvido com foco em usabilidade, performance e estética premium.

## 📂 Estrutura do Projeto

O projeto é uma aplicação unificada (monorepo simplificado) baseada em **Next.js**:

- **[src](./src)**: Contém todo o código-fonte da aplicação (Frontend e APIs internas).
  - **Módulo de Catequese**: Gestão de alunos, turmas, frequências e sacramentos.
  - **Módulo de Pastorais**: Gerenciamento de unidades pastorais, coordenadores e identidade visual.
  - **Módulo de Eventos**: Portal de notícias e eventos paroquiais com suporte a categorias e imagens.

## 🛠️ Tecnologias Principais

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/) (Design Premium)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (Prisma ORM)
- **Autenticação**: [NextAuth.js](https://next-auth.js.org/) (RBAC: Admin, Coordenador, Fiel)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide React](https://lucide.dev/)

## 🚀 Como começar

1.  **Clone o repositório**:
    ```bash
    git clone [url-do-repositorio]
    cd Paroquia-Manager
    ```

2.  **Instale as dependências** (na raiz ou em `src`):
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados**:
    Crie um arquivo `.env` dentro da pasta `src` com a sua `DATABASE_URL`.

4.  **Inicie o servidor**:
    ```bash
    npm run dev
    ```
    Acesse `http://localhost:3000` e comece a gerenciar!

---

Para detalhes técnicos de desenvolvimento, consulte o [README.dev.md](./src/README.dev.md).
