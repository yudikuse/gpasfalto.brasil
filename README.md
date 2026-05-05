# GP Asfalto Brasil — Site Institucional

Next.js 14 + Tailwind CSS + Vercel

## Como editar conteúdo

**Todo o conteúdo do site está em um único arquivo:**

```
data/content.ts
```

Edite esse arquivo pelo GitHub web UI para:
- Atualizar números (anos, loteamentos, municípios)
- Adicionar ou remover obras do portfólio
- Alterar informações de contato
- Trocar o vídeo do hero (YouTube ID ou arquivo local)
- Editar textos e especificações técnicas

## Como adicionar uma obra nova

1. Abra `data/content.ts`
2. No array `projects`, copie um objeto existente e ajuste:
   - `slug`: identificador único (sem espaços)
   - `segment`, `title`, `description`: textos
   - `photo`: caminho da foto em `/public/images/obras/nome-da-foto.jpg`
   - `index`: número sequencial ("04", "05"...)
3. Faça upload da foto em `/public/images/obras/`
4. O Vercel vai fazer o deploy automático

## Como trocar o vídeo do hero

**Opção A — YouTube (atual):**
Em `data/content.ts`, troque `videoYoutubeId` pelo ID do novo vídeo.
Ex: `videoYoutubeId: 'dQw4w9WgXcQ'`

**Opção B — Vídeo local (recomendado para produção):**
1. Coloque o arquivo `.mp4` em `/public/video/hero.mp4`
2. Em `data/content.ts`, preencha: `videoLocal: '/video/hero.mp4'`
3. O campo `videoYoutubeId` será ignorado automaticamente

## Deploy

1. Conecte o repositório no [Vercel](https://vercel.com)
2. Framework: **Next.js** (detectado automaticamente)
3. Domínio: adicionar `gpasfaltobrasil.com` nas configurações do projeto

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000
