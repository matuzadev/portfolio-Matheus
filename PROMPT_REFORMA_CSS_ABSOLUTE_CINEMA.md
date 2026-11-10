# 🎬 PROMPT ABSOLUTE CINEMA — REFORMA TOTAL DO PORTFÓLIO

> **Copie este prompt inteiro e cole no Claude. Ele contém todas as instruções técnicas, contexto do projeto atual e direção criativa para uma transformação completa.**

---

## 📋 CONTEXTO DO PROJETO ATUAL

Você vai reformar **totalmente** o CSS e JavaScript do meu portfólio pessoal. Aqui está o que existe hoje:

### Estrutura de Arquivos
- `index.html` — HTML semântico com seções: Hero/About, Projects, Education, Contact, Footer
- `style.css` (~49KB) — CSS atual com variáveis básicas, grid simples, animações mínimas
- `script.js` (~27KB) — Menu hambúrguer, modais, efeito TextScramble customizado, Typed.js
- Pasta `midia/` — Imagens e vídeos dos projetos

### Stack Atual (Vanilla)
- HTML5 + CSS3 + JavaScript puro
- Font: Inter + Barlow Condensed (Google Fonts)
- Ícones: FontAwesome 6 + Devicon
- Sem bundler, sem framework, sem bibliotecas de animação

### Identidade do Desenvolvedor
- **Nome:** Matheus Henrique
- **Perfil:** Software Developer / Full-Stack / Cybersecurity / Pentester
- **Tom:** Profissional mas com personalidade, técnico mas acessível
- **Público-alvo:** Recrutadores tech, clientes freelance, comunidade dev

---

## 🎯 MISSÃO: TRANSFORMAR EM EXPERIÊNCIA PREMIUM

Reescreva **do zero** o `style.css` e `script.js` para criar um portfólio de nível **Awwwards / FWA / CSS Design Awards**. O resultado deve parecer feito por um estúdio de design premium, não um template genérico.

### ⚠️ RESTRIÇÕES CRÍTICAS
- **NÃO use gradientes roxo/índigo/violeta** — isso é default de IA, não design intencional
- **NÃO use sombras excessivas ou blur desnecessário**
- **NÃO copie tendências do Dribbble sem entender o propósito**
- **NÃO faça animações que atrapalhem usabilidade ou performance**
- **Mantenha o HTML existente** — apenas reforme CSS e JS (pode adicionar wrappers se necessário)

---

## 🛠️ STACK OBRIGATÓRIA — INSTALE E CONFIGURE

### 1. Lenis (Smooth Scroll)
```bash
npm install lenis
```
- Implemente smooth scroll com inércia natural
- Integre com GSAP ScrollTrigger
- Respeite `prefers-reduced-motion`
- Configuração recomendada: `duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`

### 2. GSAP + ScrollTrigger + SplitText
```bash
npm install gsap
```
- Use GSAP para todas as animações complexas
- ScrollTrigger para animações on-scroll
- SplitText (ou alternativa open-source como `split-type`) para animações de texto caractere por caractere
- **Performance:** Sempre anime `transform` e `opacity`, nunca `width/height/top/left`
- Use `scrub` para animações vinculadas ao scroll
- Crie timelines reutilizáveis e organizadas

### 3. Bibliotecas Complementares (Opcional mas Recomendado)
- **Lottie-web** — Para animações vetoriais leves (se precisar de ícones animados)
- **Three.js ou R3F** — APENAS se for criar um elemento 3D hero que justifique o peso
- **Barba.js** — Se decidir implementar transições entre páginas no futuro

---

## 🎨 DIREÇÃO VISUAL — PALETA E ESTÉTICA

### Paleta de Cores (Deliberada, Não Genérica)
Escolha **UMA** das opções abaixo baseado na identidade "Developer/Cybersecurity":

**OPÇÃO A — "Cyber Noir" (Recomendada)**
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-card: #161616;
  --text-primary: #f5f5f5;
  --text-secondary: #888888;
  --accent: #00ff88; /* Verde neon cyberpunk */
  --accent-dim: rgba(0, 255, 136, 0.1);
  --border: #222222;
}
```

**OPÇÃO B — "Warm Tech"**
```css
:root {
  --bg-primary: #0d0d0d;
  --bg-secondary: #141414;
  --bg-card: #1a1a1a;
  --text-primary: #fafafa;
  --text-secondary: #999999;
  --accent: #ff6b35; /* Laranja quente, energético */
  --accent-dim: rgba(255, 107, 53, 0.1);
  --border: #252525;
}
```

**OPÇÃO C — "Electric Blue"**
```css
:root {
  --bg-primary: #050505;
  --bg-secondary: #0a0a0a;
  --bg-card: #121212;
  --text-primary: #ffffff;
  --text-secondary: #777777;
  --accent: #00d4ff; /* Azul elétrico, tech */
  --accent-dim: rgba(0, 212, 255, 0.08);
  --border: #1a1a1a;
}
```

### Tipografia
- **Display/Hero:** `Barlow Condensed` (já está) — use em tamanhos ÉPICOS (clamp(3rem, 8vw, 7rem))
- **Body/UI:** `Inter` (já está) — weights 400, 500, 600
- **Monospace (código/detalhes técnicos):** Adicione `JetBrains Mono` ou `Space Mono` para elementos tech
- **Hierarquia clara:** H1 gigante, H2 expressivo, H3 funcional, body legível

### Referências Visuais (Moodboard Mental)
- **Awwwards Site of the Year winners** — Narrativa visual, micro-interações
- **Linear.app** — UI dark mode premium, bordas sutis, glow effects
- **Vercel.com** — Tipografia bold, animações performáticas, gradientes intencionais
- **Stripe.com** — Layouts complexos que parecem simples, whitespace dramático
- **Apple Product Pages** — Scroll-driven animations, tipografia como protagonista
- **Brutalismo Suíço Contemporâneo** — Grid quebrado, tipografia oversized, contraste alto

---

## ✨ ANIMAÇÕES OBRIGATÓRIAS

### Hero Section
1. **Entrada cinematográfica:** Texto aparece com stagger reveal (GSAP SplitText ou similar)
2. **Retrato/foto:** Parallax sutil ou reveal com mask animation
3. **Status dot:** Pulse animation contínua (CSS puro, não GSAP)
4. **Background:** Grain texture sutil (CSS noise ou canvas leve)

### Scroll Animations
1. **Section reveals:** Fade-up + slight scale com ScrollTrigger
2. **Project cards:** Stagger entrance, hover com tilt 3D sutil (vanilla-tilt ou GSAP)
3. **Education cards:** Progress bar anima ao entrar na viewport
4. **Typography:** Headlines com split-text reveal ao scroll

### Micro-interações
1. **Links/botões:** Hover com underline animation ou background fill
2. **Cards:** Border glow sutil no hover (use `::before` pseudo-element)
3. **Cursor:** Custom cursor que reage a elementos interativos (opcional, mas premium)
4. **Menu mobile:** Full-screen overlay com stagger animation dos links

### Performance Rules
- Todas as animações devem usar `will-change` estrategicamente
- Respeite `prefers-reduced-motion: reduce` — desabilite animações complexas
- Lazy load imagens e vídeos
- Use `IntersectionObserver` para triggers, não scroll events diretos
- Debounce/throttle qualquer listener de scroll/resize

---

## 📐 LAYOUT E GRID

### Desktop (>1200px)
- Max-width: 1400px (não 1100px como hoje)
- Grid assimétrico no hero: texto 60% / retrato 40%
- Projects: Grid de 2 colunas com cards de tamanhos variados (featured project ocupa 2 cols)
- Whitespace GENEROSO — padding vertical de 8-12rem entre seções

### Tablet (768px - 1200px)
- Grid adaptativo com Container Queries (não apenas media queries)
- Hero stack vertical mas mantém proporções dramáticas
- Projects vira single column com cards full-width

### Mobile (<768px)
- Tipografia ainda impactante (não reduza demais)
- Menu fullscreen com animação suave
- Touch targets mínimos de 44px
- Padding horizontal reduzido mas não zerado

### Técnicas Modernas Obrigatórias
- `clamp()` para tipografia fluida
- Container Queries (`@container`) para componentes responsivos
- CSS Grid com `subgrid` onde aplicável
- `:has()` selector para estados condicionais
- `@layer` para cascade management
- CSS Nesting nativo (sem preprocessador)

---

## 🧩 COMPONENTES ESPECÍFICOS PARA REFORMAR

### Header/Nav
- Glassmorphism refinado (backdrop-filter + border sutil)
- Logo com animação de entrada
- Nav links com hover indicator animado
- CTA button com estilo distinct (não parece link comum)
- Mobile menu: fullscreen overlay, não dropdown

### Hero Section (#sobre)
- Layout quebrado: texto à esquerda, retrato à direita com overlap
- Tipografia H1 com tamanho ÉPICO e line-height tight
- Eyebrow text com tracking wide e cor accent
- Portrait card com metadata overlay (coordenadas, status, ano)
- Animação de entrada sequencial

### Projects Section (#projetos)
- Section header com kicker + headline + intro
- Grid assimétrico: primeiro projeto maior (featured)
- Cards com:
  - Image/video container com aspect-ratio fixo
  - Hover state com overlay sutil e CTA reveal
  - Tech stack tags com estilo pill/badge
  - Links externos com ícone e animação
- Filtro por categoria? (opcional, mas premium)

### Education Section (#formacao)
- Timeline visual ou cards com progress bars animadas
- Institution logos/icons
- Status badges (In Progress, Completed)
- Ano esperado de formatação em destaque

### Contact Section (#contato)
- Não parece formulário genérico
- CTA claro e convidativo
- Social links com ícones animados
- Email com mailto: estilizado
- Disponibilidade status indicator

### Footer
- Minimalista mas informativo
- Copyright + social links + maybe um easter egg
- Back to top button com smooth scroll

---

## 📝 CÓDIGO E ORGANIZAÇÃO

### CSS Architecture
```css
/* 1. Reset & Base */
/* 2. Custom Properties (:root) */
/* 3. Typography System */
/* 4. Layout Utilities */
/* 5. Components (header, hero, cards, etc.) */
/* 6. Animations (@keyframes) */
/* 7. States (hover, focus, active) */
/* 8. Media Queries & Container Queries */
/* 9. Accessibility (prefers-reduced-motion, focus-visible) */
```

### JavaScript Organization
```javascript
// 1. Imports (Lenis, GSAP, etc.)
// 2. Utility functions (debounce, throttle, prefersReducedMotion check)
// 3. Lenis initialization
// 4. GSAP ScrollTrigger setup
// 5. Component animations (hero, projects, education, contact)
// 6. Micro-interactions (cursor, hover effects)
// 7. Mobile menu logic
// 8. Cleanup & resize handlers
```

### Naming Conventions
- Classes: BEM-ish ou utility-first consistente
- Variáveis CSS: `--category-property` (ex: `--color-accent`, `--space-section`)
- Animações: Nomes descritivos (`reveal-up`, `fade-in-stagger`, `pulse-dot`)
- Comentários: Explique o PORQUÊ, não o quê

---

## ✅ CHECKLIST DE ENTREGA

Antes de entregar, verifique:

- [ ] Lenis instalado e funcionando com GSAP integration
- [ ] GSAP + ScrollTrigger configurados corretamente
- [ ] Todas as animações respeitam `prefers-reduced-motion`
- [ ] Performance: Lighthouse score >90 em Performance e Accessibility
- [ ] Cross-browser: Funciona em Chrome, Firefox, Safari, Edge (latest)
- [ ] Mobile: Testado em viewports reais (375px, 414px, 768px)
- [ ] Focus states visíveis e funcionais (keyboard navigation)
- [ ] Imagens otimizadas (lazy loading, srcset se aplicável)
- [ ] Código comentado e organizado
- [ ] Sem console errors ou warnings
- [ ] Smooth scroll funciona em todos os navegadores
- [ ] Animações não causam layout shift ou jank

---

## 🚀 INSTRUÇÕES FINAIS

1. **Instale as dependências primeiro:** `npm init -y && npm install lenis gsap`
2. **Crie um novo `style.css` do zero** — não tente patchar o antigo
3. **Crie um novo `script.js` do zero** — organize em módulos/seções claras
4. **Teste incrementalmente** — não espere terminar tudo para testar
5. **Documente decisões** — por que escolheu essa cor? Essa animação? Esse layout?
6. **Itere** — primeira versão é ponto de partida, refine baseado em feedback

### Tom do Resultado
O portfólio final deve transmitir:
- **Competência técnica** (código limpo, performático, moderno)
- **Sensibilidade visual** (design intencional, não genérico)
- **Personalidade** (não parece template, parece AUToral)
- **Profissionalismo** (pronto para produção, não protótipo)

---

## 💡 DICAS EXTRAS PARA O CLAUDE

- Use `@property` para animar custom properties (gradientes, cores)
- Explore `view-timeline` e `animation-timeline` (Scroll-driven Animations API) como progressive enhancement
- Considere `View Transitions API` para transições futuras entre páginas
- Use `color-mix()` para variações de cores dinâmicas
- Implemente dark/light mode toggle com `light-dark()` function (opcional)
- Crie um sistema de design coerente, não apenas estilos soltos

---

**AGORA COPIE ESTE PROMPT INTEIRO E JOGUE PRO CLAUDE. ELE TEM TUDO QUE PRECISA PARA CRIAR UM PORTFÓLIO DE ELITE.**

*Boa sorte, Matheus. Vai ficar insano.* 🎬✨