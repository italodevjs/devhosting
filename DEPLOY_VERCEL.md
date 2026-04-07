# Deploy no Vercel — DevHosting

## Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Repositório no GitHub: `italodevjs/devhosting`
- Chave da API Groq: `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`

---

## Passo a passo

### 1. Conectar o repositório

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Import Git Repository"**
3. Selecione o repositório `italodevjs/devhosting`

### 2. Configurar o projeto

Na tela de configuração, preencha:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | `Other` |
| **Build Command** | `pnpm run build:vercel` |
| **Output Directory** | `dist/public` |
| **Install Command** | `pnpm install` |

### 3. Adicionar variável de ambiente

Clique em **"Environment Variables"** e adicione:

| Nome | Valor |
|------|-------|
| `GROQ_API_KEY` | `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` |

### 4. Deploy

Clique em **"Deploy"** e aguarde. O site estará disponível em `devhosting.vercel.app` (ou domínio personalizado).

---

## Estrutura do projeto no Vercel

```
api/
  chat.ts          ← Função serverless (chat com IA)
client/
  src/             ← Código React/TypeScript
dist/
  public/          ← Build gerado pelo Vite (servido pelo Vercel)
vercel.json        ← Configuração de rotas
```

---

## Notas importantes

- O chat de IA (`/api/chat`) funciona como **Serverless Function** no Vercel
- O frontend é servido como **Static Site** a partir de `dist/public`
- Todas as rotas desconhecidas redirecionam para `index.html` (SPA)
