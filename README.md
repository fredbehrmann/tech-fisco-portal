# Portal institucional do Tech Fisco

Site estático de venda e apresentação institucional. São nove páginas em HTML (oito públicas mais a 404), um único arquivo CSS, um arquivo JavaScript pequeno e imagens locais. Não há framework, etapa de build, CDN, telemetria ou dependência externa para renderizar o portal.

## Como rodar localmente

Na pasta do portal, execute:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080/`. Também é possível abrir os arquivos HTML diretamente, mas o servidor local reproduz melhor o comportamento de uma hospedagem.

O portal continua legível e navegável com JavaScript desativado. Sem JavaScript, o menu permanece aberto, os acordeões usam o elemento nativo `details` e o formulário conserva a validação nativa do navegador.

## Como publicar

1. Faça as substituições listadas em **Placeholders pendentes**.
2. Copie todos os arquivos e pastas para a raiz de qualquer servidor de arquivos estáticos.
3. Configure HTTPS, cabeçalhos de segurança e política de cache no provedor ou servidor.
4. Mantenha os nomes `.html` ou configure redirecionamentos para URLs curtas, se desejar.
5. Confira `robots.txt`, `sitemap.xml`, canonical, Open Graph e JSON-LD no domínio definitivo.
6. Não é necessário compilar, instalar pacotes ou executar comando de build.

Se o servidor adotar URLs sem extensão, configure as equivalências:

| URL pública | Arquivo |
|---|---|
| `/` | `index.html` |
| `/como-funciona` | `como-funciona.html` |
| `/regras` | `regras.html` |
| `/simples-nacional` | `simples-nacional.html` |
| `/seguranca` | `seguranca.html` |
| `/auditor` | `auditor.html` |
| `/secretaria` | `secretaria.html` |
| `/contato` | `contato.html` |

A página `404.html` deve ser configurada como documento de erro do servidor; ela não entra no sitemap e traz `noindex`.

## Placeholders pendentes

Todos os placeholders usam chaves duplas e podem ser localizados com uma busca global. Os comentários HTML próximos explicam o tipo de conteúdo autorizado.

| Placeholder | Onde aparece | O que inserir |
|---|---|---|
| `{{DOMINIO_DO_SITE}}` | Metadados das 8 páginas, `robots.txt` e `sitemap.xml` | Domínio canônico sem protocolo e sem barra final, por exemplo `www.exemplo.gov.br` |
| `{{ENDPOINT_FORMULARIO}}` | `contato.html` | Endpoint HTTPS autorizado a receber o formulário por `POST`. O campo `populacao` foi substituído por `porte` (faixas); ajuste o destino conforme isso. |
| `{{PROVA_A_PREENCHER}}` | Home e página da secretaria | Resultado real, verificável, com método, período e autorização; nunca uma promessa futura |
| `{{DEPOIMENTO_A_PREENCHER}}` | Home e página da secretaria | Depoimento real, atribuível e autorizado |
| `{{MUNICIPIO_CLIENTE_A_PREENCHER}}` | Home e página da secretaria | Nome ou marca institucional somente com autorização de uso |

Até que o endpoint seja configurado, o formulário valida os campos e apresenta um erro de configuração legível. Depois da troca, respostas HTTP bem-sucedidas exibem o estado de sucesso; falhas de rede ou servidor exibem o estado de erro.

## Onde ajustar o texto comercial

- `index.html`: promessa principal, três dores, visão geral do produto, bifurcação de público e prova social.
- `simples-nacional.html`: fundamentos A/B/C, exemplo fictício, linhas A–K e fac-símile do termo.
- `regras.html`: descrição pública das dez regras e hipóteses legítimas a verificar.
- `auditor.html`: ênfase em trabalho individual, revisão de achado e peça redigida.
- `secretaria.html`: ênfase em capacidade, padronização, defensabilidade e custódia.
- `seguranca.html`: limites técnicos, requisitos de infraestrutura e ressalvas de CTN/LGPD.
- `como-funciona.html`: fontes aceitas, sequência operacional e mockups.
- `contato.html`: campos, aviso de privacidade e contexto solicitado.

Antes de publicar mudanças de conteúdo, submeta alegações de resultado, textos jurídicos, requisitos de infraestrutura e referências institucionais à revisão fiscal, jurídica e técnica.

## Segurança e funcionamento sem rede externa

Todos os ativos usados na renderização estão em `assets/`. O portal não contém `@import`, fontes remotas, analytics, pixel, script externo ou imagem externa. Os únicos destinos externos são:

- o ambiente de treinamento, aberto apenas por ação do leitor;
- o endpoint do formulário, chamado apenas após envio e depois de configurado.

URLs de canonical, Open Graph e JSON-LD são metadados e não fazem requisição no carregamento da página.

## Acessibilidade

- HTML semântico com `header`, `nav`, `main`, `section`, `article` e `footer`;
- `lang="pt-BR"`, skip link e títulos em sequência;
- foco visível composto por âmbar e azul-marinho;
- alvos interativos com pelo menos 24 × 24 px, em geral 42–48 px;
- menu acessível por teclado, com `aria-expanded` e fechamento por `Esc`;
- tabelas largas em regiões roláveis, focáveis e rotuladas;
- SVG informativo com `title` e descrição; imagens SVG com texto alternativo;
- erros de formulário ligados aos campos, resumo em `aria-live` e estados de sucesso/erro;
- movimento reduzido quando `prefers-reduced-motion: reduce` está ativo;
- conteúdo e navegação preservados sem JavaScript.

## Verificação de contraste

Relações calculadas pelo algoritmo de luminância relativa da WCAG. Texto normal exige 4,5:1; foco e componentes não textuais exigem 3:1.

| Primeiro plano | Fundo | Relação | Uso |
|---|---|---:|---|
| `#0f2747` | `#ffffff` | 14,98:1 | Títulos e bordas fortes |
| `#1b3a63` | `#ffffff` | 11,46:1 | Azul institucional |
| `#07805e` | `#ffffff` | 4,93:1 | Botão primário |
| `#0a7a55` | `#ffffff` | 5,35:1 | Links e texto verde |
| `#965d0d` | `#ffffff` | 5,43:1 | Atenção |
| `#b3312a` | `#ffffff` | 6,20:1 | Achado e erro |
| `#2a6194` | `#ffffff` | 6,49:1 | Informação |
| `#12263f` | `#ffffff` | 15,28:1 | Texto principal |
| `#5b6b82` | `#ffffff` | 5,43:1 | Texto secundário |
| `#12263f` | `#eef2f7` | 13,59:1 | Texto sobre fundo alternativo |
| `#704408` | `#fdf3e3` | 7,58:1 | Texto de aviso |
| `#7b211d` | `#fdeae8` | 8,72:1 | Texto de erro |
| `#075f44` | `#e7f8f2` | 7,00:1 | Texto de sucesso |
| `#c8d5e6` | `#091b32` | 11,62:1 | Texto do rodapé |
| `#9ce3ce` | `#091b32` | 11,77:1 | Link/ênfase no rodapé |
| `#f6c453` | `#0f2747` | 9,23:1 | Indicador de foco |

## Base de design

Os tokens ficam no topo de `assets/css/site.css`, agrupados em marca, superfícies, estados, elevação, raio e ritmo vertical. Alterar um valor ali muda o portal inteiro.

- **Pesos de fonte** usam múltiplos de 100 (`--w-semi: 600`, `--w-bold: 700`, `--w-black: 800`). Valores intermediários como `780` só funcionam com fonte variável; fora do Windows eles arredondavam para 800 e produziam um portal visivelmente mais pesado que o projetado.
- **Elevação** tem três níveis (`--sh-1`, `--sh-2`, `--sh-3`). Não crie sombras novas fora dessa escala.
- **Raio** tem cinco valores (`--r-xs` a `--r-pill`). Idem.
- **Trilhas de grid** usam `minmax(0, 1fr)`, nunca `1fr` puro: uma tabela larga dentro de uma trilha `auto` empurra o layout para fora da tela.
- **Contraste**: qualquer texto sobre fundo escuro deve usar `#9ce3ce` ou `#ffffff`. O verde institucional `#0a7a55` sobre azul-marinho rende 2,80:1 e reprova na WCAG AA — por isso `.split-panel__intro .eyebrow`, `.security-band .eyebrow` e `.cta-band .eyebrow` forçam o verde claro.

Não há webfont. O portal usa a pilha do sistema operacional, o que custa zero requisição e zero CLS. Se um dia a identidade exigir uma fonte própria, ela deve ser auto-hospedada em `assets/fonts/`, em `woff2`, com `font-display: swap` e `<link rel="preload" as="font" crossorigin>` — nunca via CDN, para não quebrar a premissa de ausência de destino externo.

## Comportamento com JavaScript

O portal funciona sem JavaScript. Com ele ativo, `assets/js/site.js` acrescenta:

- sombra no cabeçalho fixo ao rolar;
- botão de voltar ao topo, a partir de 900 px de rolagem;
- barra de CTA fixa no rodapé em telas até 719 px, que aparece depois do CTA do topo e some quando o bloco de CTA final entra em cena;
- destaque da seção corrente nos índices `[data-anchor-nav]`;
- acordeões exclusivos dentro de `[data-accordion-group]`;
- validação do formulário de contato com resumo de erros em `aria-live`.

Todas as leituras de rolagem passam por um `requestAnimationFrame` compartilhado, para não disparar layout a cada evento.

## Dados estruturados

| Página | Tipos declarados |
|---|---|
| `index.html` | `Organization`, `WebSite`, `WebPage`, `SoftwareApplication`, `FAQPage` (8 perguntas) |
| `como-funciona.html` | `Organization`, `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `simples-nacional.html` | `Organization`, `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `regras.html` | `Organization`, `SoftwareApplication`, `BreadcrumbList`, `ItemList` (10 regras) |
| `seguranca.html` | `Organization`, `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `auditor.html` | `Organization`, `SoftwareApplication`, `Audience`, `BreadcrumbList` |
| `secretaria.html` | `Organization`, `SoftwareApplication`, `Audience`, `BreadcrumbList` |
| `contato.html` | `Organization`, `BreadcrumbList` |

Os `@id` do grafo da home usam `https://{{DOMINIO_DO_SITE}}/#org`, `#site`, `#webpage` e `#software`. Ao trocar o placeholder, esses identificadores passam a resolver sozinhos.

O `og:image` é `assets/img/og-tech-fisco.png` (1200 × 630). WhatsApp, LinkedIn, Facebook e X não renderizam SVG em prévia de link — o SVG continua no repositório como fonte editável. Depois de alterar o SVG, regenere o PNG antes de publicar.

## Cabeçalhos HTTP recomendados

O portal não define cabeçalhos; isso é responsabilidade do servidor ou do provedor.

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; form-action 'self' https://SEU-ENDPOINT; frame-ancestors 'none'; base-uri 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

Cache: `assets/*` com `Cache-Control: public, max-age=31536000, immutable` (os arquivos já carregam `?v=` na URL); `*.html` com `Cache-Control: public, max-age=0, must-revalidate`. Ative compressão Brotli ou gzip — a folha de estilo cai de cerca de 30 KB para menos de 8 KB comprimida.

## Checklist de revisão antes de cada publicação

```bash
# Links e referências vazias
rg 'href="#"|src="https?://|url\(https?://' .

# Placeholders ainda pendentes
rg '\{\{[A-Z0-9_]+\}\}' .

# JSON-LD sintaticamente válido em todas as páginas
python3 -c "
import json,re,glob
for f in sorted(glob.glob('*.html')):
    h=open(f,encoding='utf-8').read()
    for b in re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>',h,re.S):
        json.loads(b)
    print(f,'ok')"

# Exatamente um H1 por página
for f in *.html; do echo "$f: $(grep -c '<h1' \"$f\") H1"; done

# Servidor local
python3 -m http.server 8080
```

Valide novamente os nove arquivos HTML no serviço oficial do W3C, teste 360 px, 768 px, 1280 px e 1920 px, percorra todos os controles com teclado e repita a abertura com JavaScript desativado.

## Estrutura

```text
.
├── index.html
├── 404.html
├── como-funciona.html
├── regras.html
├── simples-nacional.html
├── seguranca.html
├── auditor.html
├── secretaria.html
├── contato.html
├── assets/
│   ├── css/site.css
│   ├── js/site.js
│   ├── img/
│   └── fonts/
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── README.md
```

## Antes do go-live

Nesta ordem:

1. Substituir `{{DOMINIO_DO_SITE}}` nas 9 páginas, em `robots.txt`, em `sitemap.xml` e em `site.webmanifest`.
2. Substituir `{{ENDPOINT_FORMULARIO}}` em `contato.html` e testar um envio real, conferindo os estados de sucesso e de erro.
3. Resolver os três placeholders de prova (`{{PROVA_A_PREENCHER}}`, `{{DEPOIMENTO_A_PREENCHER}}`, `{{MUNICIPIO_CLIENTE_A_PREENCHER}}`) na home e em `secretaria.html`. Se ainda não houver caso autorizado, **remover as seções inteiras** — publicar uma moldura vazia com marcadores em vermelho custa mais credibilidade do que a ausência da seção.
4. Configurar `404.html` como documento de erro do servidor.
5. Aplicar os cabeçalhos HTTP e a política de cache descritos acima.
6. Registrar o domínio no Google Search Console e no Bing Webmaster Tools, enviar o sitemap e solicitar a indexação da home.
7. Rodar o Rich Results Test do Google nas páginas com `FAQPage` e `ItemList`.
8. Conferir a prévia de link no WhatsApp, no LinkedIn e no X.
