# Categorias deslizando sozinhas no celular

## O que muda (só no celular)
- O quadro com o feixe de luz continua igual ao do computador, ocupando a largura da tela.
- Dentro dele, os botões Combos, Cabelo, Tratamentos e Unhas passam sozinhos para o lado, em fila contínua e sem fim, como os logos do efeito que você mandou.
- As bordas da fila esmaecem, então os botões surgem e somem suavemente.
- Ao tocar ou segurar a fila, ela pausa para você escolher a categoria. O toque continua selecionando normalmente.
- Quem pede menos movimento nas configurações do aparelho vê a fila parada, com rolagem manual como hoje.
- O computador não muda.

## Detalhes técnicos
- `index.tsx`: no celular, a lista de categorias é duplicada (cópia com `aria-hidden` e `tabIndex=-1`) dentro de uma faixa `.category-marquee`. A animação CSS `translateX(0 → -50%)` faz o loop sem emenda.
- `styles.css`: a regra `@media(max-width:640px)` troca o scroll-snap pela animação (cerca de 18s, linear, infinita), com máscara de gradiente nas bordas e `animation-play-state:paused` em `:active`, `:hover` e `:focus-within`. Com `prefers-reduced-motion`, a animação fica desligada e a cópia oculta.
- O loop do feixe em `beam-card.tsx` não muda e não entra nenhum loop rAF novo.
