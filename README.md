# Central Católica

O **Central Católica** é uma plataforma integrada para a vida de fé e a centralização de informações católicas. Ela oferece acesso à Bíblia Sagrada, Liturgia Diária, Calendário Litúrgico, Santos, Orações e notícias atualizadas do Vaticano.

## 📂 Estrutura do Projeto

O projeto é uma aplicação unificada baseada em **Next.js**:

- **[src](./src)**: Contém o código-fonte da aplicação.

## 🛠️ Tecnologias Principais

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/) (Design Premium)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide React](https://lucide.dev/)

## 🌍 Fontes de Dados

Para garantir a fidelidade e riqueza das informações, utilizei as seguintes fontes:

- **Santos**: Dados obtidos via Web Scraping da Wikipedia.
- **Notícias**: Sincronizadas via RSS do [Vatican News](https://www.vaticannews.va/pt.rss.xml).
- **Calendário Litúrgico**: Dados provenientes do [Romcal](https://www.romcal.net/).
- **Orações**: Coletadas do site [Padre Paulo Ricardo](https://padrepauloricardo.org/oracoes/) via Web Scraping.
- **Liturgia Diária**: API de [Dancrf/liturgia-diaria](https://github.com/Dancrf/liturgia-diaria).
- **Bíblia Sagrada**: Repositório JSON [fidalgobr/bibliaAveMariaJSON](https://github.com/fidalgobr/bibliaAveMariaJSON).

## 🚀 Como começar

1.  **Clone o repositório**:
    ```bash
    git clone [url-do-repositorio]
    cd Central-Catolica
    ```

2.  **Instale as dependências** (na raiz ou em `src`):
    ```bash
    npm install
    ```
    
3.  **Inicie o servidor**:
    ```bash
    npm run dev
    ```
    Acesse `http://localhost:3000!`

---

Para detalhes técnicos de desenvolvimento, consulte o [README.dev.md](./src/README.dev.md).