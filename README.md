# NLW AGENTS 2025

Projeto desenvolvido durante evento da Rocketseat, focado na criação de um backend robusto com TypeScript e tecnologias modernas.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Zod** - Validação de schemas e tipos TypeScript
- **Fastify Type Provider Zod** - Integração entre Fastify e Zod

### Banco de Dados
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM TypeScript-first para PostgreSQL
- **Drizzle Kit** - CLI para migrations e schema management

### Desenvolvimento
- **Biome** - Linter e formatter para JavaScript/TypeScript
- **Ultracite** - Extensão do Biome com regras adicionais
- **Docker Compose** - Orquestração de containers

## 📁 Estrutura do Projeto

```
src/
├── db/                    # Configurações do banco de dados
│   ├── connection.ts      # Conexão com PostgreSQL
│   ├── seed.ts           # Scripts de seed
│   ├── migrations/       # Migrations do Drizzle
│   └── schema/           # Schemas das tabelas
├── http/
│   └── routes/           # Rotas da API
├── env.ts                # Configuração de variáveis de ambiente
└── server.ts             # Servidor principal
```

## 🛠️ Configuração e Setup

### Pré-requisitos
- Node.js (versão 20+)
- Docker e Docker Compose
- Git

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd NLWAgents-2025
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3333
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/nlw_agents
```

### 4. Inicie o banco de dados
```bash
docker-compose up -d
```

### 5. Execute as migrations
```bash
npx drizzle-kit migrate
```

### 6. Execute o seed (opcional)
```bash
npm run db:seed
```

### 7. Inicie o servidor
```bash
# Desenvolvimento (com watch mode)
npm run dev

# Produção
npm start
```

O servidor estará disponível em `http://localhost:3333`

## 🏗️ Padrões de Projeto

### Arquitetura
- **Separação de responsabilidades**: Divisão clara entre rotas, schemas e conexões
- **Type Safety**: Uso extensivo do TypeScript para tipagem forte
- **Validation First**: Validação de entrada com Zod

### Convenções de Código
- **ESM Modules**: Uso de imports/exports ES6
- **Snake Case**: Nomeação de colunas no banco de dados
- **Type Providers**: Integração entre validação e tipagem

### Banco de Dados
- **Schema as Code**: Definição de schemas em TypeScript
- **Migrations**: Controle de versão do banco via Drizzle Kit
- **Connection Pool**: Gerenciamento eficiente de conexões

## 📋 Scripts Disponíveis

- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run db:seed` - Executa scripts de seed no banco

## 🔧 Configurações Adicionais

### Biome/Ultracite
O projeto utiliza Biome com extensão Ultracite para linting e formatting, garantindo:
- Código consistente
- Boas práticas de acessibilidade
- Otimizações de performance
- Padrões TypeScript rigorosos

### Docker
O PostgreSQL é executado via Docker Compose na porta `5433` para evitar conflitos com instalações locais.

---

Desenvolvido com ❤️ durante o evento NLW da Rocketseat
