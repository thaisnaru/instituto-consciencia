# Instituto Consciência — Website

Website premium para o Instituto Consciência, desenvolvido com Next.js 15, TypeScript, Tailwind CSS, Framer Motion e Supabase.

## Setup rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Variáveis de ambiente
Copie `.env.local.example` para `.env.local` e preencha:
```bash
cp .env.local.example .env.local
```

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon pública |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço (somente servidor) |
| `NEXT_PUBLIC_GOOGLE_FORM_URL` | Link do formulário de inscrição |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número com DDI (ex: 5511999999999) |
| `NEXT_PUBLIC_INSTAGRAM_URL` | URL do Instagram |

### 3. Banco de dados (Supabase)
Execute o arquivo `supabase/schema.sql` no SQL Editor do seu projeto Supabase.

### 4. Usuário admin
No Supabase Dashboard → Authentication → Users → Add user.

### 5. Imagem Hero
Coloque a imagem principal em `public/hero-banner.jpg`.

### 6. Rodar em desenvolvimento
```bash
npm run dev
```

## Estrutura

```
app/
  page.tsx              → Landing page (/)
  admin/login/          → Login admin
  admin/dashboard/      → Painel admin
  api/ritual/           → API do ritual (GET/PUT)
  api/participants/     → API de participantes (GET/POST)
components/
  sections/             → Seções da landing page
  shared/               → Navbar, Footer, Logo, CountdownTimer
lib/
  supabase.ts           → Cliente Supabase + tipos
  utils.ts              → Utilitários
middleware.ts           → Proteção das rotas /admin
supabase/schema.sql     → Schema do banco de dados
```

## Deploy
Recomendado: [Vercel](https://vercel.com) — adicione as variáveis de ambiente no painel do projeto.
