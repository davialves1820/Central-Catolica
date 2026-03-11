---
description: Como atualizar o banco de dados em produção usando Prisma
---

Para atualizar o banco de dados de produção com as novas mudanças do `schema.prisma`, siga estes passos:

1. Certifique-se de que a variável de ambiente `DATABASE_URL` no seu ambiente de produção (Vercel, Railway, Render, etc.) está apontando para o banco correto.

2. Execute o comando de deploy de migrações:
// turbo
```bash
npx prisma migrate deploy
```

> [!IMPORTANT]
> O comando `migrate deploy` aplica apenas migrações pendentes sem resetar o banco de dados ou criar novas migrações. É o comando recomendado para CI/CD e ambientes de produção.

3. Se houver mudanças no schema, não esqueça de gerar o cliente novamente:
// turbo
```bash
npx prisma generate
```
