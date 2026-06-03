# CRUD de Produtos e Livros — DSW UNEMAT 2026.1

Atividade avaliativa da matéria de **Desenvolvimento de Software para Web**  
Faculdade: **UNEMAT — Universidade do Estado de Mato Grosso**

| | |
|---|---|
| **Aluno** | Vinicius Gabriel Costa Almeida |
| **Professor** | Ivan Luiz Pedroso Pires |
| **Semestre** | 2026.1 |
| **Apoio** | Claude (Anthropic) — utilizado como assistente para desenvolvimento e documentação |

---

## Sobre o projeto

Aplicação CRUD completa com duas entidades: **Produtos** e **Livros**.  
O backend usa Express.js rodando no Bun, com banco MySQL acessado pelo mysql2,  
organizado no padrão Routes + Controllers. O frontend é HTML puro com JavaScript usando fetch.

A parte de **Livros** foi adicionada como extensão da atividade base, tocando todas as camadas da aplicação: banco de dados, controller, rotas e frontend.

## Tecnologias

- [Bun](https://bun.sh) — runtime JavaScript mais rápido que Node
- Express.js — framework web
- mysql2/promise — conexão com MySQL usando async/await
- HTML + CSS + JavaScript puro no frontend

## Estrutura do projeto
aula-16-06-26/
├── backend/
│   ├── database.sql
│   ├── package.json
│   └── src/
│       ├── config/database.js
│       ├── controllers/
│       │   ├── produtoController.js
│       │   └── livroController.js
│       ├── routes/
│       │   ├── produtoRoutes.js
│       │   └── livroRoutes.js
│       └── server.js
└── frontend/
├── index.html
├── script.js
└── style.css
## Por que não tem node_modules no repositório?

O Bun usa um cache global em `~/.bun/install/cache/` em vez de criar um `node_modules` local com symlinks. Isso é mais eficiente, mas causa problemas em pastas sincronizadas pelo **OneDrive** (que não suporta links simbólicos). Por isso o projeto foi executado fora do OneDrive e o `node_modules` foi adicionado ao `.gitignore`.

Ao clonar o repositório, basta rodar `bun install` que o Bun resolve tudo automaticamente pelo cache global.

## Como rodar

### Pré-requisitos

- [Bun](https://bun.sh) instalado
- MySQL Server rodando em `localhost:3306`

### 1. Criar o banco de dados

```bash
mysql -u root -p < backend/database.sql
```

### 2. Configurar a conexão

Edite `backend/src/config/database.js` com seu usuário e senha do MySQL:

```js
user: 'root',
password: 'SUA_SENHA',
```

### 3. Instalar dependências e rodar

```bash
cd backend
bun install
bun run dev
```

O servidor sobe em `http://localhost:3002`.

### 4. Abrir o frontend

Abra `frontend/index.html` com o **Live Server** do VS Code.

## Endpoints da API

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | /produtos | Lista todos os produtos |
| GET | /produtos/:id | Busca produto por ID |
| POST | /produtos | Cria novo produto |
| PUT | /produtos/:id | Atualiza produto |
| DELETE | /produtos/:id | Remove produto |
| GET | /livros | Lista todos os livros |
| GET | /livros/:id | Busca livro por ID |
| POST | /livros | Cria novo livro |
| PUT | /livros/:id | Atualiza livro |
| DELETE | /livros/:id | Remove livro |

---

*Documentação elaborada com apoio do Claude (Anthropic).*
*Atividade feita com o apoio do Claude (Anthropic).*
