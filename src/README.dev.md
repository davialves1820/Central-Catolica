# Paróquia Manager - Guia do Desenvolvedor

Este é o sistema fullstack, construído com **Next.js**, **React 19**, **TypeScript** e **Tailwind CSS 4**.

## 🛠️ Requisitos

- Node.js >= 20.x
- Gerenciador de pacotes (npm, yarn ou pnpm)

## ⚙️ Configuração Local

1.  **Instale as dependências:**

    ```bash
    npm install
    ```

2.  **Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz da pasta `src` e configure:

    ```env
    DATABASE_URL="postgres://..."
    NEXTAUTH_SECRET="..."
    NEXTAUTH_URL="http://localhost:3000"
    ```

3.  **Banco de Dados (Prisma):**
    Sincronize o esquema e gere o cliente:

    ```bash
    npx prisma generate
    npx prisma db push # Para prototipação rápida
    # ou
    npx prisma migrate dev --name migracao_nova
    ```

4.  **Execução:**
    Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor Next.js em modo desenvolvimento.
- `npm run build`: Gera a build de produção otimizada.
- `npm run start`: Inicia o servidor com a build de produção.
- `npm run lint`: Executa a verificação do linter (ESLint).

## 🏗️ Arquitetura

- **app/catequese**: Módulo de gestão de alunos e turmas.
- **app/pastorais**: Módulo de gestão de unidades pastorais.
- **app/events**: Módulo de criação e visualização de eventos.
- **api/**: Endpoints Hono/Next.js para lógica de negócio.
- **lib/api**: Configuração do Axios para comunicação frontend-backend.
- **components**: Componentes reutilizáveis (UI e layouts premium).
- **prisma**: Esquema do banco de dados e migrações SQL.

## 🎨 Estilização

Utilizamos o **Tailwind CSS 4** para estilização. O design é focado em acessibilidade e responsividade, garantindo uma boa experiência em dispositivos móveis.

---

## 🧪 Qualidade de Código

O projeto possui **Quality Gate automático**.

Antes de qualquer merge, o GitHub executa:

- ✅ Lint
- ✅ Formatação
- ✅ Type Check
- ✅ Build

Caso alguma etapa falhe, o merge é bloqueado.

---

## 🔄 Workflow de Desenvolvimento

### Estratégia de Branches

Branch Descrição

---

main Produção
develop Integração
feature/\* Novas funcionalidades
fix/\* Correções

---

### Fluxo recomendado

```bash
git checkout develop
git pull
git checkout -b feature/nova-feature
```

Após desenvolvimento:

```bash
npm run format
npm run lint
npx prettier --write "caminho/do/arquivo"
npm run typecheck
npm run build
```

Abra um Pull Request para `develop`.

---

## 📜 Scripts Disponíveis

Script Descrição

---

npm run dev Ambiente de desenvolvimento
npm run build Build produção
npm run start Executa build
npm run lint Verifica código
npm run format Formata código
npm run typecheck Verifica tipos

---

## ✅ Padrões de Código

Este projeto utiliza:

- ESLint (configuração oficial AdonisJS)
- Prettier
- TypeScript Strict Mode

Correção automática:

```bash
npm run format
npm run lint -- --fix
```

---

## 🤝 Contribuição

1.  Fork o projeto
2.  Crie uma branch (`feature/minha-feature`)
3.  Commit suas alterações
4.  Abra um Pull Request
